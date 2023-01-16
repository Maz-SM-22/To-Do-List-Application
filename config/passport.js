const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

const initialize = (passport) => {
    const customFields = {
        usernameField: 'email',
        passwordField: 'password'
    };

    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({ email: email });

        if (!user) {
            return done(null, false, { message: 'No user with that email' });
        }

        try {
            if (await bcrypt.compare(password, user.hash)) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (error) {
            return done(error);
        }
    }
    passport.use(new LocalStrategy(customFields, authenticateUser));

    passport.serializeUser((user, done) => {
        return done(null, user.id);
    })

    passport.deserializeUser(async (id, done) => {
        const user = await User.findOne({ _id: id });
        return done(null, user);
    })
}

module.exports = initialize; 