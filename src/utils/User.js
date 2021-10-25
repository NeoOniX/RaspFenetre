const bcrypt = require('bcrypt');
const IDGenerator = require('./IDGenerator');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { parse, stringify } = JSON;

class User {

    static deserialize (id) {
        let users = parse(readFileSync(join(__dirname, "../../store/users.json")));
        let user = users.filter((user) => user.id == id)[0];

        if (user) {
            return user;
        } else {
            throw new Error('Error while deserializing User : User is not registered.');
        }
    }

    static register (icon, name, pass, ...perms) {
        let users = parse(readFileSync(join(__dirname, "../../store/users.json")));
        let id = IDGenerator.generate();
        let dupID = users.filter((user) => user.id == id)[0];

        while (id == dupID) {
            id = IDGenerator.generate();
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(pass, salt, (err, hash) => {
                if (err) throw err;
                let user = {
                    id,
                    icon,
                    name,
                    pass: hash,
                    perms: perms ? perms : [],
                    prefs: [],
                }

                users.push(user);
                writeFileSync(join(__dirname, "../../store/users.json"), stringify(users, null, 4));
                return user;
            });
        });

        
    }

    static login (name, pass) {
        let users = parse(readFileSync(join(__dirname, "../../store/users.json")));
        let user = users.filter((user) => user.name == name)[0];

        if (user) {
            bcrypt.compare(pass, user.pass, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return {
                        loggedIn: true,
                        user: {...user},
                    }
                } else {
                    return {
                        loggedIn: false,
                        message: "Mot de passe incorrect.",
                    }
                }
            })
            return user;
        } else {
            return {
                loggedIn: false,
                message: "Utilisateur inexistant.",
            }
        }
    }
}

module.exports = User;