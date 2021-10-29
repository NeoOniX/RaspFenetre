let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('login.ejs');
});

app.get('/home', function (req, res) {
    res.render('home.ejs');
});

app.get('/room', function (req, res) {
    res.render('room.ejs', { roomname: 'Classe E2', sensorsnumber: '3' });
});

app.get('/settings', function (req, res) {
    res.render('settings.ejs');
});

app.get('/sensor', function (req, res) {
    res.render('sensor.ejs', {
        sensorname: 'Température sensor - LM35',
        sensorvalue: '35.2°C',
        sensortype: 'Capteur de température',
        batterysetup: true,
        sensorbattery: '74',
        sensorroom: 'Classe E2',
        sensorroomupdate: true,
    });
});

app.use(function (req, res, next) {
    res.render('error.ejs', { errorid: '404' });
});

app.listen(8080);
