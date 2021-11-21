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

    // Device data obtention route
    router.get('/device/:deviceid', (req, res) => {
        // Get data about the device
        let device = Device.deserialize(req.params.deviceid);
        // Get data about the room the device is in
        let room = Room.deserialize(device.room);

        // Send the data back as a JSON
        res.status(200).send(JSON.stringify({
            id: device.id,
            name: device.name,
            type: device.type,
            room: room.name,
            logs: device.logs,
            value: device.logs.filter((log) => log.type == "data")[0] ? device.logs.filter((log) => log.type == "data")[0].value : "",
            battery: device.logs.filter((log) => log.type == "battery")[0] ? device.logs.filter((log) => log.type == "battery")[0].value : "n/a",
        })).end();
    });

    // Room data obtention route
    router.get('/room/:roomid', (req, res) => {
        // Get data about the room
        let room = Room.deserialize(req.params.roomid);
        // Get the list of devices in the room
        let devices = Device.list().filter((device) => device.room == room.id);

        // Start to build a return object
        let ret = {
            id: room.id,
            name: room.name,
            devicescount: devices.length,
            devices : []
        };

        // Add data of each devices in the room to the return object
        for (let device of devices) {
            ret.devices.push({
                id: device.id,
                name: device.name,
                logs: device.logs,
                value: device.logs.filter((log) => log.type == "data")[0] ? device.logs.filter((log) => log.type == "data")[0].value : ""
            });
        }

        // Send the data (return object) back as a JSON
        res.status(200).send(JSON.stringify(ret)).end();
    });

    return router;
}

module.exports = getRoute;