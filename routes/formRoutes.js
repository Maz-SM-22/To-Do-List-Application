const express = require('express');
const formController = require('../controllers/formController');

const router = express.Router();

router.get('/task/create', formController.renderTaskForm);
router.get('/task/edit', formController.renderTaskForm);
router.get('/login', formController.renderLoginForm);
router.get('/register', formController.renderRegisterForm);

module.exports = router; 
