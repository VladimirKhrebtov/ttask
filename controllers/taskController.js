const Task = require('../models/task');
const User = require('../models/user');

exports.getTasks = (req, res, next) => {
    Task.fetchAllTasks()
        .then(result => {
            res.render('tasks-list', {
                pageTitle: 'Tasks list',
                tasksList: result,
            });
        })
        .catch(error => {
            console.log(error);
        })
};

exports.getAddTask = (req, res, next) => {
    res.render('add-task', {
        pageTitle: 'Add new task',
        editable: false
    });
};

exports.getSingleTask = (req, res, next) => {
    let AllUsers;
    User.fetchUsers()
        .then(users => {
            AllUsers = users;
        })
        .catch(error => {
            console.log(error);
        });

    Task.fetchSingleTask(req.params.id)
        .then(task => {

            res.render('single-task', {
                pageTitle: task.title,
                task: task,
                users: AllUsers
            });
        })
        .catch(error => {
            console.log(error);
        })
};

exports.postAddTask = (req, res, next) => {
    const task = new Task(req.body);
    task.save();

    res.redirect('/');
};

exports.getEditTask = (req, res, next) => {
    Task.fetchSingleTask(req.params.id)
        .then(task => {
            res.render('add-task', {
                pageTitle: 'Add new task',
                task: task,
                editable: true
            });
        })
        .catch(error => {
            console.log(error);
        })
};

exports.postEditTask = (req, res, next) => {
    Task.update(req.params.id, req.body)
        .then(() => {
            res.redirect('/tasks');
        })
        .catch(error => {
            console.log(error);
        })
};

exports.deleteTask = (req, res, next) => {
    Task.delete(req.params.id)
        .then(() => {
            res.redirect('/tasks');
        })
        .catch(error => {
            console.log(error);
        })
};
