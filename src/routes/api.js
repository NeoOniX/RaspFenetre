const express = require('express');

let router = express.Router();

function getRoute (...args) {
    router.get('/send', (req, res) => {
        console.log(`API Send | GET | Valeur = ${req.query.valeur}`);
        res.status(200);
        res.end();
    });

    router.post('/send', (req, res) => {
        console.log(`API Send | POST | Valeur1 = ${req.body.valeur1} | Valeur2 = ${req.body.valeur2}`);
        res.status(200);
        res.end();
    });

    return router;
}

module.exports = getRoute;