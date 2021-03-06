const express = require('express');
const { existsSync, createWriteStream } = require('fs');
const { join } = require('path');
const { User } = require('../utils');

let router = express.Router();

function getRoute (...args) {
    // On first run, show the page to create the Administrator account
    router.get('/', (req, res) => {
        res.render('welcome', { formaction: "/welcome" });
    });

    // Administrator account registration route
    router.post('/', (req, res) => {
        // Create an empty User object
        let user = { icon: "base_icon.png" };

        // On a form field
        req.busboy.on('field', (fieldname, value) => {
            // If the field is either the name or the password
            if (['name', 'pass'].includes(fieldname)) {
                // Add this property to the User object
                user[fieldname] = value;
            }
        });

        // On a form file
        req.busboy.on('file', (fieldname, file, filename) => {
            // If the field is the icon field
            if (fieldname == "icon" && filename) {
                // Find an available file name
                let i = 0;
                let fname = `${i}_${filename}`;
                while(existsSync(join(__dirname, '../public/img/', fieldname, fname))) {
                    i++;
                    fname = `${i}_${filename}`;
                }
                // Create a file writing stream with the available file name
                let fstream = createWriteStream(join(__dirname, '../public/img/', fieldname, fname));

                // Set the user icon property as the location of the file
                user.icon = fname;

                // Write the uploaded icon through the file writing stream
                file.pipe(fstream);
            } else {
                // If no file is provided, we need to skip by doing this
                file.resume();
            }
        });

        // On form end
        req.busboy.on('finish', () => {
            // Register the new user using the properties of the User object
            User.register(user.icon, user.name, user.pass, ["administrator"]).then((user) => {
                res.redirect('../auth/login');
            });
        });

        // Send request data through the busboy middleware configured above
        req.pipe(req.busboy);
    });

    return router;
}

module.exports = getRoute;