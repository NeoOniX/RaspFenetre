const { Device } = require('../utils');
const express = require('express');

let router = express.Router();

function getRoute (...args) {

    router.post('/sensor', (req, res) => {
        Device.log(req.ip, req.body);
        res.status(200);
        res.end();
    });

    return router;
}

module.exports = getRoute;