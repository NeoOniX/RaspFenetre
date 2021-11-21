const express = require('express');
const { User, Room, Device } = require('../utils');

let router = express.Router();

function getRoute (...args) {
    // Redirection to home
    router.get('/', (req, res) => {
        res.redirect('/home');
    });

    // Home page route
    router.get('/home', (req, res) => {
        // Deny access if user isn't logged in
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        // Prepare data and show home page
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