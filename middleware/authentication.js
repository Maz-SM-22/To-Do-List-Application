const passport = require('passport');
const initializePassport = require('../config/passport');

initializePassport(passport);

const checkAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated) {
        return res.render('error', {
            error: 'You do not have permission to access this page'
        })
    }
    res.redirect('/tasks');
}

module.exports = checkAuthenticated; 
