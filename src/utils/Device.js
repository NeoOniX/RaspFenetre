const IDGenerator = require('./IDGenerator');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { parse, stringify } = JSON;

class Device {
    static list () {
        return parse(readFileSync(join(__dirname, "../../store/devices.json")));
    }

    static deserialize (id) {
        let devices = this.list();
        let device = devices.filter((device) => device.id == id)[0];

        if (device) {
            return device;
        } else {
            return;
        }
    }

    static register (ip, name, type) {
        return new Promise((resolve, reject) => {
            let devices = this.list();
            let id = IDGenerator.generate();

            while (devices.filter((device) => device.id == id).length > 0) {
                id = IDGenerator.generate();
            }

            let device = {
                id,
                ip,
                name,
                type,
                room: "0",
                logs: []
            }

            devices.push(device);
            writeFileSync(join(__dirname, "../../store/devices.json"), stringify(devices, null, 4));
            resolve(device);
        });
    }

    static identify (ip) {
        return new Promise((resolve, reject) => {
            let devices = this.list();
            let device = devices.filter((device) => device.ip == ip).at(-1);

            if (device) {
                resolve({
                    found: true,
                    device: device
                });
            } else {
                resolve({
                    found: false
                });
            }
        });
    }

    static delete (id) {
        if (id.id) id=id.id;
        let devices = this.list();
        devices = devices.filter((device) => device.id != id);
        writeFileSync(join(__dirname, "../../store/devices.json"), stringify(devices, null, 4));
    }

    static log (ip, log) {
        let devices = this.list();
        let device = devices.filter((device) => device.ip == ip).at(-1);

        log.time = Date.now();

        if (device) {
            device.logs.push(log);
            writeFileSync(join(__dirname, "../../store/devices.json"), stringify(devices, null, 4));
        }
    }
}

module.exports = Device;