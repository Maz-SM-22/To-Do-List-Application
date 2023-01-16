const Task = require('../models/Task');

const renderTaskForm = (req, res) => {
    if (req.params.id) {
        Task.findById(req.params.id).then(task => {
            res.render('taskForm', { task: task });
        })
    }
    else res.render('taskForm', { task: null });
}

const renderLoginForm = (req, res) => {
    res.render('loginForm');
}

const renderRegisterForm = (req, res) => {
    res.render('registerForm');
}

module.exports = { renderTaskForm, renderLoginForm, renderRegisterForm };
