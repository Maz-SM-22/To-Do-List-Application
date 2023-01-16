const passport = require('passport');
const bcrypt = require('bcrypt');
const initializePassport = require('../config/passport');
const User = require('../models/User');
const { GeneralError, BadRequest, NotFoundError } = require('../utils/error');

initializePassport(passport);

const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !password || !email) {
            throw new BadRequest('Missing required field');
        } else {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                res.render('error', { error: `Email ${req.body.email} is already registered` });
            } else {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                await User.create({
                    username: username,
                    email: email,
                    hash: hashedPassword
                });
                res.redirect('/login');
            }
        }
    }
    catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    // TODO: Add some kid of notification for failed login
    passport.authenticate('local', {
        successRedirect: '/tasks',
        failureRedirect: '/'
    })(req, res, next);
}

const logoutUser = (req, res, next) => {
    req.logout(error => {
        if (error) return next(error);
        res.redirect('/');
    });
    res.clearCookie('connect.sid', { path: '/' });
    req.session.destroy(error => {
        if (error) return next(error);
        res.redirect('/');
    })
}

module.exports = { registerUser, loginUser, logoutUser }; 
