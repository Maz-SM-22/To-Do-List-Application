const Task = require('../models/Task');
const { NotFoundError } = require('../utils/error');

const renderTaskForm = async (req, res, next) => {
    try {
        const taskId = req.params.id || null;
        if (taskId) {
            const task = await Task.findById(taskId);
            if (!task) {
                throw new NotFoundError(`No task found with id ${taskId}`);
            } else {
                res.render('taskForm', { task: task });
            }
        } else {
            res.render('taskForm', { task: null });
        }
    } catch (error) {
        next(error);
    }
}

const renderLoginForm = (req, res, next) => {
    try {
        res.render('loginForm');
    } catch (error) {
        next(error);
    }
}

const renderRegisterForm = (req, res, next) => {
    try {
        res.render('registerForm');
    } catch (error) {
        next(error);
    }
}

module.exports = { renderTaskForm, renderLoginForm, renderRegisterForm };
