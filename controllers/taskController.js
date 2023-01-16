const Task = require('../models/Task');

const getTasks = (req, res) => {
    Task.find({}).then(tasks => {
        res.render('tasks', { tasks: tasks, user: req.user });
    });
}

const createTask = (req, res, next) => {
    const task = new Task({
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

const getTaskById = (req, res) => {
    console.log(req.params.id)
    Task.findById(req.params.id).then(task => {
        res.render('singleView', { task: task });
    })
}

const editTask = (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    }).then(() => {
        res.redirect('/tasks');
    })
}

const deleteTask = (req, res) => {
    Task.findByIdAndDelete(req.params.id).then(task => {
        res.render('taskDeleted', { task: task });    // If you wanna use this you have to create an endpoint. Fetch won't work with render
    })
}

const updateTaskStatus = (req, res) => {
    Task.findById(req.params.id).then(task => {
        task.completed = !task.completed;
        task.save((error) => console.log(error));
    })
    res.redirect('/tasks');
}

module.exports = { getTasks, createTask, getTaskById, editTask, deleteTask, updateTaskStatus }; 
