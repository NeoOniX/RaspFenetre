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

    return router;
}

module.exports = getRoute;