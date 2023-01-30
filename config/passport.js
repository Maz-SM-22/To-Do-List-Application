const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { BadRequest } = require('../utils/error');

const initialize = (passport) => {
    const customFields = {
        usernameField: 'email',
        passwordField: 'password'
    };

    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({ email: email });

        if (!user) {
            return done(new BadRequest(`No user with email ${email} found`), false);
        }

        try {
            if (await bcrypt.compare(password, user.hash)) {
                return done(null, user);
            } else {
                return done(new BadRequest('Password incorrect'), false);
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
