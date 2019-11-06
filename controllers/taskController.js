const Task = require('../models/task');

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
    Task.fetchSingleTask(req.params.id, task => {
        res.render('single-task', {
            pageTitle: task.title,
            task: task
        });
    })
};

exports.postAddTask = (req, res, next) => {
    const task = new Task(req.body);
    task.save();

    res.redirect('/');
};
