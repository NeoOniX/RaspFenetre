const express = require('express');
const { User, Room, Device } = require('../utils');

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

        let rooms = Room.list();

        for (let room of rooms) {
            room.devices = Device.list().filter(device => device.room == room.id);
        }

        res.render('home.ejs', { rooms, users, user: req.user });
    });

    router.get('/settings', (req, res) => {
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        if (req.user.perms.includes("administrator")) {
            let users = User.list();
            users.filter((user) => user.id == req.user.id)[0].connected = true;
    
            res.render('settings.ejs', { users, user: req.user });
        } else {
            res.redirect('/home')
        }
    });

    router.get('/settings_members_list', (req, res) => {
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        if (req.user.perms.includes("administrator")) {
            let users = User.list();
            users.filter((user) => user.id == req.user.id)[0].connected = true;
    
            res.render('settings_members_list.ejs', { users, user: req.user });
        } else {
            res.redirect('/home')
        }
    });

    router.get('/settings_rooms_list', (req, res) => {
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        if (req.user.perms.includes("administrator")) {
            let users = User.list();
            users.filter((user) => user.id == req.user.id)[0].connected = true;

            let rooms = Room.list();

            res.render('settings_rooms_list.ejs', { rooms, users, user: req.user });
        } else {
            res.redirect('/home')
        }
    });

    return router;
}

module.exports = getRoute;