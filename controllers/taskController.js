const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const { indexOf } = require('lodash');
const Task = require('../models/Task');

const getTasks = (req, res) => {
    const tasks = JSON.parse(fs.readFileSync('./public/json/taskStore.json'), 'utf-8');
    res.render('tasks', { tasks: tasks });
}

const createTask = (req, res) => {
    const tasks = JSON.parse(fs.readFileSync('./public/json/taskStore.json'), 'utf-8');
    let newTask = {
        id: uuidv4(),
        title: req.body.title.trim(),
        description: req.body.description.trim(),
        completed: false,
        dueDate: req.body.dueDate
    }
    tasks.push(newTask);
    fs.writeFile('./public/json/taskStore.json', JSON.stringify(tasks, null, 2), (err, data) => {
        if (err) console.log(err)
    });
    res.redirect('/tasks');
}

const getTaskById = (req, res) => {
    const tasks = JSON.parse(fs.readFileSync('./public/json/taskStore.json'), 'utf-8');
    const taskToDisplay = _.find(tasks, ['id', req.params.id]);
    res.render('singleView', { task: taskToDisplay });
}

const editTask = (req, res) => {            // Needs header "Content-Type: application/json" 
    const tasks = JSON.parse(fs.readFileSync('./public/json/taskStore.json'), 'utf-8');
    const taskToEdit = _.find(tasks, ['id', req.params.id]);
    let updatedTask = {
        id: taskToEdit.id,
        title: req.body.title.trim(),
        description: req.body.description.trim(),
        completed: false,
        dueDate: req.body.dueDate
    }
    Object.assign(taskToEdit, updatedTask);
    fs.writeFile('./public/json/taskStore.json', JSON.stringify(tasks, null, 2), (err, data) => {
        if (err) console.log(err)
    });
    res.redirect('/tasks');
}

const deleteTask = (req, res) => {
    const tasks = JSON.parse(fs.readFileSync('./public/json/taskStore.json'), 'utf-8');
    const taskToDelete = _.find(tasks, ['id', req.params.id]);
    _.remove(tasks, (task) => task.id === req.params.id);
    fs.writeFile('./public/json/taskStore.json', JSON.stringify(tasks, null, 2), (err, data) => {
        if (err) console.log(err)
    });
    res.render('taskDeleted', { task: taskToDelete });
}

module.exports = { getTasks, createTask, getTaskById, editTask, deleteTask }; 
