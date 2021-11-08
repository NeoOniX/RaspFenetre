// Require
const express = require('express');
const session = require('express-session');
const minify = require('express-minify');
const compression = require('compression');
const cors = require('cors');
const busboy = require('connect-busboy');
const favicon = require('serve-favicon');
const config = require('../config');
const fetch = require('node-fetch');
const { join } = require('path');
const { Scan, AuthPassport, User, Device, Room } = require('./utils');
let passport = require('passport');

// User
// let u = User.register("0_logo.png", "Utilisateur", "test");

let lastDevices = Device.list();

// IP Scan
Scan.scan(config.network.CIDR, config.network.options)
.then((ips) => {
    for (let ip of ips) {
        Device.identify(ip)
        .then((identity) => {
            if (identity.found) {
                lastDevices = lastDevices.filter((device) => device.id != identity.device.id);
            } else {
                let url = new URL(`http://${ip}/info`);
                fetch(url).then((res) => {
                    return res.json();
                }).then((data) => {
                    Device.register(ip, data.type, data.type);
                }).catch((err) => { });
            }
        });
    }
}).then(() => {
    for (let device of lastDevices) {
        Device.log(device.ip, { type: "error", value: "Communication impossible"})
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

    // Custom middleware :
    // If no user are in the database, redirect to the welcome screen
    // If the first administrator account is created, block access to welcome screen
    app.use((req, res, next) => {
        if (User.list().length == 0 && req.url != "/welcome" && req.method == "GET") {
            res.redirect("/welcome");
        } else if (User.list().length > 0 && req.url == "/welcome") {
            res.redirect("/home");
        } else {
            next();
        }
    });


    // Routes
    app
    .use("/", require('./routes/home')())
    .use("/welcome", require('./routes/welcome')())
    .use("/auth", require('./routes/auth')(passport))
    .use("/room", require('./routes/room')())
    .use("/device", require('./routes/device')())
    .use("/api", require('./routes/api')())
    .use((req, res, next) => {
        res.render('error.ejs', { errorid: '404' });
    });

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
    // process.on('uncaughtException', cleanExit);
})
.catch((err) => {
    throw err;
});