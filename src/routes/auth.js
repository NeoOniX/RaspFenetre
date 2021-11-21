const bcrypt = require('bcrypt');
const express = require('express');
const { existsSync, createWriteStream } = require('fs');
const { join } = require('path');
const { User } = require('../utils');

let router = express.Router();

function getRoute (...args) {
    
    // New account registration route
    router.post('/register', (req, res) => {
        // Deny access if user isn't logged in
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        // Deny access if user isn't an administrator
        if (!req.user.perms.includes("administrator")) {
            res.redirect('/home');
            return;
        }

        // Base user object
        let user = {icon: "base_icon.png", perms:[]};

        // Bool : new account or edit account ?
        let register = true;
        // Bool : new password ?
        let newpass = false;

        // On a form field
        req.busboy.on('field', (fieldname, value) => {
            // If an id is specified
            if (fieldname == "id" && value) {
                // Pass into account edit mode
                register=false;
                // Replace the base user object with the edited user object
                user = User.deserialize(value);
            }

            // If the admin permission is checked
            if (fieldname == "admin" && value == "on" && !user.perms.includes("administrator")) {
                // Add "administrator" to permissions
                user.perms.unshift("administrator");
            }

            // If a new password is specified in edit mode
            if (fieldname == "pass" && value && !register) {
                // Pass into new password mode
                newpass = true;
            }

            // If a name or a password is provided
            if (['name', 'pass'].includes(fieldname) && value) {
                // Edit user object with the data
                user[fieldname] = value;
            }
        });

        // On a form file
        req.busboy.on('file', (fieldname, file, filename) => {
            // If an icon is provided
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
            // If in register mode
            if (register) {
                // Register the new user account
                User.register(user.icon, user.name, user.pass, user.perms).then((user) => {
                    // Redirect to the accounts management page
                    res.redirect('/settings/accounts');
                });
            } else {
            // In edit account mode
                // If a new password has been provided, we need to encrypt it
                if (newpass) {
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) reject(err);
                        bcrypt.hash(user.pass, salt, (err, hash) => {
                            if (err) reject(err);
                            user.pass = hash;
                            // Edit the user with the new data
                            User.edit(user).then((user) => {
                                // Redirect to the accounts management page
                                res.redirect('/settings/accounts');
                            });
                        });
                    });
                } else {
                // If there isn't a new password
                    // Edit the user with the new data
                    User.edit(user).then((user) => {
                        // Redirect to the accounts management page
                        res.redirect('/settings/accounts');
                    });
                }
            }
        });

        // Send request data through the busboy middleware configured above
        req.pipe(req.busboy);
    });

    // Login page GET route
    router.get('/login', (req, res) => {
        // Get the users list
        let users = User.list();
        // If user is already connected to an account
        if (req.user) {
            // Add the property "connected" with value true to the connected account
            users.filter((user) => user.id == req.user.id)[0].connected = true;
        }
        // Render the login page with the data
        res.render('login', { users });
    });

    // Login POST route
    router.post('/login', (req, res, next) => {
        // If user is already connected, log out
        if (req.user) req.logOut();
        // If it is a logout request, we don't need to go further
        if (req.query.logout) {
            // Render the login page with a logout message
            return res.render('login', { users: User.list(), log: "Déconnecté", ...req.body });
        }
        // Here, args[0] is the local passport
        args[0].authenticate('local', (err, user, info) => {
            if (err) {
                console.log(err);
                next(err);
            }
            if (!user) {
                return res.render('login', { users: User.list(), log: info.message, ...req.body });
            }
            req.logIn(user, (err) => {
                if (err) {
                    console.log(err);
                    return next(err);
                }
                res.redirect('/home');
            })
        })(req, res, next);
    });

    // Account deletion route
    router.post('/delete', (req, res) => {
        // Deny access if user isn't logged in
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        // If user is an administrator
        if (req.user.perms.includes("administrator")) {
            // If the user is logged into the account being deleted
            if (req.user.id == req.body.id) {
                // Logout and redirect to the login page
                req.logOut();
                res.redirect('/auth/login');
                // Delete the account
                User.delete(req.body.id);
            } else {
                // Delete the account
                User.delete(req.body.id);

                // Prepare data and show the accounts settings page
                let users = User.list();
                users.filter((user) => user.id == req.user.id)[0].connected = true;
        
                res.render('settings_members_list', { users, user: req.user });
            }
        } else {
            res.redirect('/home')
        }
    })

    return router;
}

module.exports = getRoute;