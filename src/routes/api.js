const { Device, Room } = require('../utils');
const express = require('express');

let router = express.Router();

function getRoute (...args) {

    // Data reception route
    router.post('/device', (req, res) => {
        Device.log(req.ip, req.body);
        res.status(200);
        res.end();
    });

    router.get('/device/:deviceid', (req, res) => {
        let device = Device.deserialize(req.params.deviceid);
        let room = Room.deserialize(device.room);

        res.status(200).send(JSON.stringify({
            name: device.name,
            type: device.type,
            room: room.name,
            value: device.logs.filter((log) => log.type == "data").at(-1) ? device.logs.filter((log) => log.type == "data").at(-1).value : "",
            battery: device.logs.filter((log) => log.type == "battery").at(-1) ? device.logs.filter((log) => log.type == "battery").at(-1).value : "n/a",
        })).end();
    });

    router.get('/room/:roomid', (req, res) => {
        let room = Room.deserialize(req.params.roomid);
        let devices = Device.list().filter((device) => device.room = room.id);

        let ret = {
            name: room.name,
            devicescount: devices.length,
            devices : []
        };

        for (let device of devices) {
            ret.devices.push({
                name: device.name,
                value: device.logs.filter((log) => log.type == "data").at(-1) ? device.logs.filter((log) => log.type == "data").at(-1).value : ""
            });
        }

        res.status(200).send(JSON.stringify(ret)).end();
    });

    return router;
}

module.exports = getRoute;