const { readFileSync } = require('fs');
const { join } = require('path');

class Device {

    ip = "";
    name = "";
    type = "";
    room = null;
    logs = [];

    constructor (ip, name, type, ...room) {
        this.ip = ip;
        this.name = name;
        this.type = type;
        readFileSync(join(__dirname, "../../store/devices.json"))
    }
}

module.exports = Device;