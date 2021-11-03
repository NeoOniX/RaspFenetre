const express = require('express');

let router = express.Router();

function getRoute (...args) {
    router.get('/', (req, res) => {
        res.redirect('/home');
    });

    router.get('/home', (req, res) => {
        if (!req.user) {
            res.redirect('/auth/login');
        }
        res.render('home.ejs', { user: req.user });
    });

    return router;
}

module.exports = getRoute;