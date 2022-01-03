const express = require('express');
const { Device, User, Room } = require('../utils');

let router = express.Router();

function getRoute (...args) {
    // Device page route
    router.get('/:deviceid', (req, res) => {
        // Deny access if user isn't logged in
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        // Get device data
        let device = Device.deserialize(req.params.deviceid);

        // If the device exists
        if (device) {
            // Prepare data and show the device page
            let users = User.list();
            users.filter((user) => user.id = req.user.id)[0].connected = true;
            res.render('device.ejs', { rooms: Room.list(), users, user: req.user, device });
        } else {
            res.render('backpage.ejs');
        }
    });

    return router;
}

module.exports = getRoute;