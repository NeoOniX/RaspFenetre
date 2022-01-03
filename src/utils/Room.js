const IDGenerator = require('./IDGenerator');
const Device = require('./Device');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { parse, stringify } = JSON;

class Room {
    static list () {
        return parse(readFileSync(join(__dirname, "../../store/rooms.json")));
    }

    static deserialize (id) {
        let rooms = this.list();
        let room = rooms.filter((room) => room.id == id)[0];

        if (room) {
            return room;
        } else {
            return {};
        }
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

    static edit (room) {
        return new Promise((resolve, reject) => {
            let rooms = this.list();
            rooms = rooms.map(r => r.id == room.id ? room : r);
            writeFileSync(join(__dirname, "../../store/rooms.json"), stringify(rooms, null, 4));
            resolve(room);
        })
    }

    static delete (id) {
        if (id.id) id=id.id;
        let rooms = this.list();
        rooms = rooms.filter((room) => room.id != id);
        let devices = Device.list().filter((device) => device.room == id);
        for (let device of devices) {
            device.room = "0";
        }
        writeFileSync(join(__dirname, "../../store/rooms.json"), stringify(rooms, null, 4));
    }
}

module.exports = Room;