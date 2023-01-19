const Task = require('../models/Task');
const { GeneralError, BadRequest, NotFoundError } = require('../utils/error');

const getTasks = (req, res, next) => {
    try {
        Task.find({}).then(tasks => {
            res.render('tasks', { tasks: tasks, user: req.user });
        });
    } catch (error) {
        next(error);
    }
}

const createTask = async (req, res, next) => {
    try {
        const { title, description, dueDate } = req.body;
        if (!title) {
            throw new BadRequest('Please enter a title for your task');
        } else {
            const task = await Task.create({
                title: req.body.title.trim(),
                description: req.body.description.trim(),
                completed: false,
                dueDate: req.body.dueDate
            });
            task.save((error) => {
                if (error) next(error);
                else res.redirect('/tasks');
            })
        }
    } catch (error) {
        next(error);
    }
}

const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            throw new NotFoundError(`Unable to display task with id ${req.params.id}`);
        } else {
            res.render('singleView', { task: task });
        }
    } catch (error) {
        next(error);
    }
}

const editTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!task) {
            throw new NotFoundError(`Unable to update task with id ${req.params.id}`);
        } else {
            res.redirect('/tasks');
        }
    } catch (error) {
        next(error);
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            throw new NotFoundError(`Unable to delete task with id ${req.params.id}`);
        } else {
            res.render('taskDeleted', { task: task });    // If you wanna use this you have to create an endpoint. Fetch won't work with render
        }
    } catch (error) {
        next(error);
    }
}

const updateTaskStatus = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            throw new NotFoundError(`Unable to update status of task with id ${req.params.id}`);
        } else {
            task.completed = !task.completed;
            task.save((error) => {
                if (error) return next(error);
            });
            res.redirect('/tasks');
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { getTasks, createTask, getTaskById, editTask, deleteTask, updateTaskStatus }; 
