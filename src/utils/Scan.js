const async = require('async');
const net = require('net');
const { getIPRange } = require('get-ip-range');

class Scan {
    static scan (CIDR, options = {}) {
        return new Promise((resolve, reject) => {
            try {
                let addresses = [];
                async.each(getIPRange(CIDR), (ip, next) => {
                    let s = new net.Socket();
                    s.setTimeout(options.timeout ? options.timeout : 1500, () => {s.destroy(); next();});
                    s.on('error', () => { s.destroy(); next(); });
                    s.connect(options.port ? options.port : 80, ip, () => { addresses.push(ip); s.destroy(); next(); });
                }, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(addresses);
                    }
                });
            } catch (err) {
                reject(err)
            }
        });
    }
}

module.exports = Scan;