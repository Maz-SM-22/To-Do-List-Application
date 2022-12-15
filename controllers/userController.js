const registerUser = (res, req, next) => {
    // register user
    console.log(req.body);
    res.redirect('/tasks');
}

const loginUser = (res, req, next) => {
    //login user 
    console.log(req.body);
    res.redirect('/tasks');
}

const logoutUser = (res, req, next) => {
    res.redirect('/home');
}

module.exports = { registerUser, loginUser, logoutUser }; 