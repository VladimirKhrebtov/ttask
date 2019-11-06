const Task = require('../models/task');
const User = require('../models/user');

exports.getTasks = (req, res, next) => {
    Task.fetchAllTasks((tasks) => {
        if(tasks.toString()) {
            console.log();
            res.render('tasks-list', {
                pageTitle: 'Tasks list',
                tasksList: tasks
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

exports.getSingleTask = (req, res, next) => {
    let existingUsers;
    User.fetchUsers((users) => {
        existingUsers = users;
    });
    Task.fetchSingleTask(req.params.id, task => {
        res.render('single-task', {
            pageTitle: task.title,
            task: task,
            users: existingUsers
        });
    })
};

exports.postAddTask = (req, res, next) => {
    const task = new Task(req.body);
    task.save();

    res.redirect('/');
};
