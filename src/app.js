// Require
const express = require('express');
const session = require('express-session');
const minify = require('express-minify');
const compression = require('compression');
const cors = require('cors');
const busboy = require('connect-busboy');
const favicon = require('serve-favicon');
const http = require('http');
const config = require('../config');
const { join } = require('path');
const { Scan, AuthPassport, User, Device, Room } = require('./utils');
let passport = require('passport');

// User
// let u = User.register("0_logo.png", "Utilisateur", "test");
// console.log(User.login("Gauthier", "clear"));

let lastDevices = Device.list();

// IP Scan
Scan.scan(config.network.CIDR, config.network.options)
.then((ips) => {
    for (let ip of ips) {
        Device.identify(ip)
        .then((identity) => {
            if (identity.found) {
                console.log("Device found");
                lastDevices = lastDevices.filter((device) => device.id != identity.device.id);
            } else {
                let url = new URL(`http://${ip}/info`);
                http.get(url, res => {
                    let resp = "";
                    res.on("data", data => { resp += data });
                    res.on("end", () => {
                        let info = JSON.parse(resp);
                        Device.register(ip, info.type, info.type).then((device) => {
                            console.log("Device registered");
                        });
                    });
                });
            }
        });
    }
    console.log("After for loop");
}).then(() => {
    console.log("Then");
    for (let device of lastDevices) {
        console.log(device);
    }
}).then(() => {
    // Local Passport
    AuthPassport.setAsLocal(passport);

    // Express App
    let app = express();

    // App config
    app
    .set('view engine', 'ejs')
    .set('views', join(__dirname, '/views'))
    .use(cors())
    .use(favicon(join(__dirname, 'public/img/favicon.ico')))
    .use(busboy())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(compression())
    .use(minify())
    .use(express.static(join(__dirname, 'public')))
    .use(session({
        saveUninitialized: true,
        resave: false,
        name: config.session.name,
        secret: config.session.secret
    }))
    .use(passport.initialize())
    .use(passport.session());

    // Routes
    app.use("/", require('./routes/home')());
    app.use("/init", require('./routes/init')(passport));
    app.use("/auth", require('./routes/auth')(passport));
    app.use("/api", require('./routes/api')());

    // Server start
    let server = app.listen(8080, () => {
        console.log(`Server started on port ${server.address().port}`);
    });

    // Secure Server stop on process exit
    function cleanExit() {
        if (server) {
            server.close(() => {
                console.log("Server stopped.");
            });
            server = null;
        }
    };

    process.on('exit', cleanExit);
    process.on('SIGTERM', cleanExit);
    process.on('SIGINT', cleanExit);
    process.on('SIGUSR1', cleanExit);
    process.on('SIGUSR2', cleanExit);
    process.on('uncaughtException', cleanExit);
})
.catch((err) => {
    throw err;
});