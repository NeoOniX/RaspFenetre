const LocalStrategy = require('passport-local').Strategy;
const User = require('./User');

class AuthPassport {
    constructor(passport) {
        passport.use(
            new LocalStrategy({usernameField: 'username', passwordField: 'pass'}, (username, password, done) => {
                let logs = User.login(username, password);
                if (logs.loggedIn) {
                    return done(null, logs.user);
                } else {
                    return done(null, false, {message: message});
                }
            })
        );

        passport.serializeUser((user, done) => {
            done(null, user.id)
        });

        passport.deserializeUser((id, done) => {
            done(null, User.deserialize(id));
        });
    }
}

module.exports = AuthPassport;