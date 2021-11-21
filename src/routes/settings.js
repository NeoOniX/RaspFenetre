const express = require('express');
const { existsSync, createWriteStream } = require('fs');
const { join } = require('path');
const { User, Room } = require('../utils');

let router = express.Router();

function getRoute (...args) {
    // Settings main page route
    router.get('/', (req, res) => {
        // Deny access if user isn't logged in
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        // If user is an administrator
        if (req.user.perms.includes("administrator")) {
            // Prepare data and show settings main page
            let users = User.list();
            users.filter((user) => user.id == req.user.id)[0].connected = true;
    
            res.render('settings', { users, user: req.user });
        } else {
            res.redirect('/home')
        }
    });

    // Accounts settings page route
    router.get('/accounts', (req, res) => {
        // Deny access if user isn't logged in
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        // If user is an administrator
        if (req.user.perms.includes("administrator")) {
            // Prepare data and show accounts settings page
            let users = User.list();
            users.filter((user) => user.id == req.user.id)[0].connected = true;
    
            res.render('settings_members_list', { users, user: req.user });
        } else {
            res.redirect('/home')
        }
    });

    // Rooms settings page route
    router.get('/rooms', (req, res) => {
        // Deny access if user isn't logged in
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        // If user is an administrator
        if (req.user.perms.includes("administrator")) {
            // Prepare data and show rooms settings page
            let users = User.list();
            users.filter((user) => user.id == req.user.id)[0].connected = true;
    
            let rooms = Room.list();

            res.render('settings_rooms_list', { rooms, users, user: req.user });
        } else {
            res.redirect('/home')
        }
    });

    // Rooms create / edit / delete route
    router.post('/rooms', (req, res) => {
        // Deny access if user isn't logged in
        if (!req.user) {
            res.redirect('/auth/login');
            return;
        }

        // If user is an administrator
        if (req.user.perms.includes("administrator")) {
            // If it's a delete request
            if (req.query.delete) {
                // Delete the room
                Room.delete(req.body.id);

                // Prepare data and show rooms settings page
                let users = User.list();
                users.filter((user) => user.id == req.user.id)[0].connected = true;
        
                let rooms = Room.list();
    
                res.render('settings_rooms_list', { rooms, users, user: req.user });
            } else if (Room.list().filter((room) => room.id == req.body.id)[0]) {
            // If a room with the specified id exists

                // Get data about the room
                let room = Room.list().filter((room) => room.id == req.body.id)[0];
                // Edit the data
                room.name = req.body.room;

                // Save the edits
                Room.edit(room).then((room) => {
                    // Prepare data and show rooms settings page
                    let users = User.list();
                    users.filter((user) => user.id == req.user.id)[0].connected = true;
            
                    let rooms = Room.list();
        
                    res.render('settings_rooms_list', { rooms, users, user: req.user });
                });
            } else {
                // Register the new room
                Room.register(req.body.room).then((room) => {
                    // Prepare data and show rooms settings page
                    let users = User.list();
                    users.filter((user) => user.id == req.user.id)[0].connected = true;
            
                    let rooms = Room.list();
        
                    res.render('settings_rooms_list', { rooms, users, user: req.user });
                });
            }
        } else {
            res.redirect('/home')
        }
    });
    
    return router;
}

module.exports = getRoute;