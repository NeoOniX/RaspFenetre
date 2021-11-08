const express = require('express');
const { existsSync, createWriteStream } = require('fs');
const { join } = require('path');
const { User } = require('../utils');

let router = express.Router();

function getRoute (...args) {
    router.post('/register', (req, res) => {
        let user = {};

        req.busboy.on('field', (fieldname, value) => {
            if (['name', 'pass'].includes(fieldname)) {
                user[fieldname] = value;
            }
        });

        req.busboy.on('file', (fieldname, file, filename) => {
            if (fieldname == "icon") {
                let i = 0;
                let fname = `${i}_${filename}`;
                while(existsSync(join(__dirname, '../public/img/', fieldname, fname))) {
                    i++;
                    fname = `${i}_${filename}`;
                }
                let fstream = createWriteStream(join(__dirname, '../public/img/', fieldname, fname));

                user.icon = fname;

                file.pipe(fstream);
            }
        });

        req.busboy.on('finish', () => {
            User.register(user.icon, user.name, user.pass);
        });

        req.pipe(req.busboy);
    });

    router.get('/login', (req, res) => {
        let users = User.list();
        if (req.user) {
            users.filter((user) => user.id == req.user.id)[0].connected = true;
        }
        res.render('login', { users });
    });

    router.post('/login', (req, res, next) => {
        if (req.user) req.logOut();
        if (req.query.logout) {
            return res.render('login', { users: User.list(), log: "Déconnecté", ...req.body });
        }
        args[0].authenticate('local', (err, user, info) => {
            if (err) {
                console.log(err);
                next(err);
            }
            if (!user) {
                return res.render('login', { users: User.list(), log: info.message, ...req.body });
            }
            req.logIn(user, (err) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                res.redirect('/home');
            })
        })(req, res, next);
    });

    return router;
}

module.exports = getRoute;