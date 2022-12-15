const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', urlencodedParser, userController.registerUser);
router.post('/login', urlencodedParser, userController.loginUser);
router.get('/logout', userController.logoutUser);

module.exports = router;
