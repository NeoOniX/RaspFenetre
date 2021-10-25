const express = require('express');

let router = express.Router();

function getRoute (...args) {
    router.get('/', (req, res) => {
        res.redirect('/home');
    });

    router.get('/home', (req, res) => {
        res.render('home.ejs');
    });

    return router;
}

module.exports = getRoute;