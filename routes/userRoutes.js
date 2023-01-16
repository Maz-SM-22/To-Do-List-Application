const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const initializePassport = require('../config/passport');
const userController = require('../controllers/userController');

initializePassport(passport);

const router = express.Router();

router.post('/register', urlencodedParser, userController.registerUser);
router.post('/login', urlencodedParser, userController.loginUser);
router.get('/logout', userController.logoutUser);

module.exports = router;
