const express = require('express');

let router = express.Router();

function getRoute (...args) {
    router.get('/login', (req, res) => {
        res.render('login.ejs');
    });

    return router;
}

module.exports = getRoute;