const Task = require('../models/Task');
const User = require('../models/User');
const { BadRequest, NotFoundError } = require('../utils/error');

const getTasks = async (req, res, next) => {
    try {
        const userObj = await User.findById(req.user._id).populate('tasks');
        res.render('tasks', { tasks: userObj.tasks, user: req.user });
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
            const user = req.user;
            const task = await Task.create({
                title: title.trim(),
                description: description.trim(),
                completed: false,
                dueDate: dueDate
            });
            task.save((error) => {
                if (error) next(error);
                else {
                    user.tasks.push(task._id);
                    user.save((err) => {
                        if (err) return next(err);
                        res.redirect('/tasks');
                    })
                }
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
