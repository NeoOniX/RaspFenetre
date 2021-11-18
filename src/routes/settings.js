const express = require('express');
const { existsSync, createWriteStream } = require('fs');
const { join } = require('path');
const { User } = require('../utils');

let router = express.Router();

function getRoute (...args) {
    router.get('/', (req, res) => {
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        if (req.user.perms.includes("administrator")) {
            let users = User.list();
            users.filter((user) => user.id == req.user.id)[0].connected = true;
    
            res.render('settings', { users, user: req.user });
        } else {
            res.redirect('/home')
        }
    });

    router.get('/rooms', (req, res) => {
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        if (req.user.perms.includes("administrator")) {
            let users = User.list();
            users.filter((user) => user.id == req.user.id)[0].connected = true;
    
            let rooms = Room.list();

            res.render('settings_rooms_list', { rooms, users, user: req.user });
        } else {
            res.redirect('/home')
        }
    });

    router.get('/accounts', (req, res) => {
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        if (req.user.perms.includes("administrator")) {
            let users = User.list();
            users.filter((user) => user.id == req.user.id)[0].connected = true;
    
            res.render('settings_members_list', { users, user: req.user });
        } else {
            res.redirect('/home')
        }
    });
    
    return router;
}

module.exports = getRoute;