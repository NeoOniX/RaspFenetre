const express = require('express');
const { Room, Device, User } = require('../utils');

let router = express.Router();

function getRoute (...args) {
    // Room page route
    router.get('/:roomid', (req, res) => {
        // Deny access if user isn't logged in
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        // Get room data
        let room = Room.deserialize(req.params.roomid);

        // If the room exists
        if (room) {
            // Prepare data and show room page
            let users = User.list();
            users.filter((user) => user.id = req.user.id)[0].connected = true;
            res.render('room.ejs', { users, user: req.user, roomname: room.name, id: room.id });
        } else {
            res.render('backpage.ejs');
        }
    });

    return router;
}

module.exports = getRoute;