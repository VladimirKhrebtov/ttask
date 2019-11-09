const Task = require('../models/task');
const User = require('../models/user');

exports.getTasks = (req, res, next) => {
    Task.fetchAllTasks((tasks) => {
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
        pageTitle: 'Add new task',
        editable: false
    });
};

exports.getSingleTask = (req, res, next) => {
    Task.fetchSingleTask(req.params.id, task => {
        User.fetchUsers((users) => {
            res.render('single-task', {
                pageTitle: task.title,
                task: task,
                users: JSON.parse(users)
            });
        });
    })
};

exports.postAddTask = (req, res, next) => {
    const task = new Task(req.body);
    task.save();

    res.redirect('/');
};

exports.getEditTask = (req, res, next) => {
    const edit = req.query.edit;
    if (edit) {
        Task.fetchSingleTask(req.params.id, task => {
            res.render('add-task', {
                pageTitle: task.title,
                task: task,
                editable: edit
            });
        })
    } else {
        res.redirect('/tasks');
    }
}

exports.postEditTask = (req, res, next) => {
    const updatedTask = new Task(req.body);
    updatedTask.update(req.params.id);
    res.redirect('/tasks');
}
