const express = require('express');

let router = express.Router();

function getRoute (...args) {
    router.get('/', (req, res) => {
        res.render('accueil');
    });

    return router;
}

module.exports = getRoute;