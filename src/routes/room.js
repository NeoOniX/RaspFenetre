const express = require('express');
const { Room, Device, User } = require('../utils');

let router = express.Router();

function getRoute (...args) {
    router.get('/:roomid', (req, res) => {
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        let room = Room.deserialize(req.params.roomid);

        if (room) {
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