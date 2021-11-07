const LocalStrategy = require('passport-local').Strategy;
const User = require('./User');

class AuthPassport {
    static setAsLocal(passport) {
        passport.use(
            new LocalStrategy({usernameField: 'id', passwordField: 'pass'}, (id, password, done) => {
                User.login(id, password).then((logs) => {
                    if (logs.loggedIn) {
                        return done(null, logs.user);
                    } else {
                        return done(null, false, {message: logs.message});
                    }
                }).catch((reason) => {
                    throw reason;
                });
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