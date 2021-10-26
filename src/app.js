// Require
const express = require('express');
const session = require('express-session');
const minify = require('express-minify');
const compression = require('compression');
const cors = require('cors');
const busboy = require('connect-busboy');
const favicon = require('serve-favicon');
const config = require('../config');
const { join } = require('path');
const { Tools, Classes } = require('./utils');
const { Scan, AuthPassport } = Tools;
const { User, Device, Room } = Classes;
let passport = require('passport');

// User
// let u = User.register("test", "Gauthier", "clear");
// console.log(User.login("Gauthier", "clear"));

// IP Scan
// Scan.scan(config.network.CIDR, config.network.options).then(console.log);

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