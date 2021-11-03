const IDGenerator = require('./IDGenerator');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { parse, stringify } = JSON;

class Room {
    static list () {
        return parse(readFileSync(join(__dirname, "../../store/rooms.json")));
    }

    static register (name) {
        return new Promise((resolve, reject) => {
            let rooms = this.list();
            let id = IDGenerator.generate();

            while (rooms.filter((room) => room.id == id).length > 0) {
                id = IDGenerator.generate();
            }

            let room = {
                id,
                name
            }

            rooms.push(room);
            writeFileSync(join(__dirname, "../../store/rooms.json"), stringify(rooms, null, 4));
            resolve(room);
        });
    }

    static delete (id) {
        if (id.id) id=id.id;
        let rooms = this.list();
        rooms = rooms.filter((room) => room.id != id);
        writeFileSync(join(__dirname, "../../store/rooms.json"), stringify(rooms, null, 4));
    }
}

module.exports = Room;