let express = require('express');
let app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('login.ejs');
});

app.get('/home', function (req, res) {
    res.render('home.ejs');
});

app.use(function (req, res, next) {
    res.render('error.ejs', { errorid: '404' });
});

app.listen(80);
