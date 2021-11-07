const express = require('express');
const { Device, User } = require('../utils');

let router = express.Router();

function getRoute (...args) {
    router.get('/:deviceid', (req, res) => {
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        let device = Device.deserialize(req.params.deviceid);

        if (device) {
            let users = User.list();
            users.filter((user) => user.id = req.user.id)[0].connected = true;
            res.render('device.ejs', { users, user: req.user, id: device.id });
        } else {
            res.render('backpage.ejs');
        }
    });

    return router;
}

module.exports = getRoute;