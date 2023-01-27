const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { BadRequest } = require('../utils/error');

const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !password || !email) {
            throw new BadRequest('Missing required field');
        } else {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                throw new BadRequest(`Email ${req.body.email} is already registered`);
            } else {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                User.create({ username: username, email: email, hash: hashedPassword })
                    .then(user => {
                        req.login(user, (err) => {
                            if (err) return next(err);
                            res.redirect('/tasks');
                        })
                    }).catch(error => next(error));
            }
        }
    }
    catch (error) {
        next(error);
    }
}

const loginUser = async (req, res, next) => {
    try {
        passport.authenticate('local', {
            successRedirect: '/tasks',
            failureRedirect: '/',
            failureFlash: true
        })(req, res, next);
    } catch (error) {
        next(error);
    }
}

const logoutUser = (req, res, next) => {
    try {
        req.logout(error => {
            if (error) return next(error);
            res.redirect('/');
        });
        res.clearCookie('connect.sid', { path: '/' });
        req.session.destroy(error => {
            if (error) return next(error);
            res.redirect('/');
        })
    } catch (error) {
        next(error);
    }
}

module.exports = { registerUser, loginUser, logoutUser }; 
