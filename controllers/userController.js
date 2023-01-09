const User = require('../models/User');

const registerUser = (req, res, next) => {
    const user = User.findOne({ email: req.body.email }, (error, user) => {
        if (user) {
            res.render('error', {
                statuscode: 400,
                message: `Email ${req.body.email} is already registered`
            })
        } else {
            User.create(req.body);
            res.redirect('/tasks');
        }
    })
}

const loginUser = async (res, req, next) => {
    // 
}

const logoutUser = (res, req, next) => {
    res.redirect('/home');
}

module.exports = { registerUser, loginUser, logoutUser }; 