const bcrypt = require('bcrypt');
const IDGenerator = require('./IDGenerator');
const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { parse, stringify } = JSON;

class User {
    static list () {
        return parse(readFileSync(join(__dirname, "../../store/users.json")));
    }

    static deserialize (id) {
        let users = this.list();
        let user = users.filter((user) => user.id == id)[0];

        if (user) {
            return user;
        } else {
            throw new Error('Error while deserializing User : User is not registered.');
        }
    }

    static register (icon, name, pass, perms = []) {
        return new Promise((resolve, reject) => {
            let users = this.list();
            let id = IDGenerator.generate();
    
            while (users.filter((user) => user.id == id).length > 0) {
                id = IDGenerator.generate();
            }
    
            bcrypt.genSalt(10, (err, salt) => {
                if (err) reject(err);
                bcrypt.hash(pass, salt, (err, hash) => {
                    if (err) reject(err);
                    let user = {
                        id,
                        icon,
                        name,
                        pass: hash,
                        perms,
                        prefs: [],
                    }
    
                    users.push(user);
                    writeFileSync(join(__dirname, "../../store/users.json"), stringify(users, null, 4));
                    resolve(user);
                });
            });
        });
    }

    static login (id, pass) {
        return new Promise((resolve, reject) => {
            let users = this.list();
            let user = users.filter((user) => user.id == id)[0];
    
            if (user) {
                bcrypt.compare(pass, user.pass, (err, isMatch) => {
                    if (err) reject(err);
                    if (isMatch) {
                        resolve({
                            loggedIn: true,
                            user: user,
                        });
                    } else {
                        resolve({
                            loggedIn: false,
                            message: "Mot de passe incorrect.",
                        });
                    }
                });
            } else {
                resolve({
                    loggedIn: false,
                    message: "Utilisateur inexistant.",
                });
            }
        });
    }

    static edit (user) {
        return new Promise((resolve, reject) => {
            let users = this.list();
            users = users.map(u => u.id == user.id ? user : u);
            writeFileSync(join(__dirname, "../../store/users.json"), stringify(users, null, 4));
            resolve(user);
        })
    }

    static delete (id) {
        if (id.id) id=id.id;
        let users = this.list();
        users = users.filter((user) => user.id != id);
        writeFileSync(join(__dirname, "../../store/users.json"), stringify(users, null, 4));
    }
}

module.exports = User;