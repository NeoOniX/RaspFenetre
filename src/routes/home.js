const express = require('express');
const { User } = require('../utils');

let router = express.Router();

function getRoute (...args) {
    router.get('/', (req, res) => {
        res.redirect('/home');
    });

    router.get('/home', (req, res) => {
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        let users = User.list();
        users.filter((user) => user.id == req.user.id)[0].connected = true;

        res.render('home.ejs', { users, user: req.user });
    });

    router.get('/settings', (req, res) => {
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        let users = User.list();
        users.filter((user) => user.id == req.user.id)[0].connected = true;

        res.render('settings.ejs', { users, user: req.user });
    });

    return router;
}

module.exports = getRoute;