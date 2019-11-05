const path = require('path');
const fs = require('fs');
const Task = require('../models/task');

exports.getTasks = (req, res, next) => {
    Task.fetchTasks((tasks) => {
        if(tasks.toString()) {
            res.render('tasks-list', {
                pageTitle: 'Tasks list',
                tasksList: JSON.parse(tasks)
            });
        } else {
            res.render('tasks-list', {
                pageTitle: 'Tasks list',
                tasksList: undefined
            });
        }
    })
};

exports.getAddTask = (req, res, next) => {
    res.render('add-task', {
        pageTitle: 'Add new task'
    });
};

exports.postAddTask = (req, res, next) => {
    // const writeStream = fs.createWriteStream('tasks.json', { flags: 'a'});
    const task = new Task(req.body);
    task.save();

    res.redirect('/');
};
