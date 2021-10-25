const { readFileSync } = require('fs');
const { join } = require('path');

class Room {

    ip = "";
    name = "";
    type = "";
    room = null;
    logs = [];

    constructor (ip, name, type) {
        this.ip = ip;
        this.name = name;
        this.type = type;
        readFileSync(join(__dirname, "../../store/rooms.json"))
    }
}

module.exports = Room;