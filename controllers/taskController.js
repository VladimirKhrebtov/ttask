const path = require('path');
const fs = require('fs');

exports.getTasks = (req, res, next) => {
    fs.readFile('tasks.json', (err, data) => {
        if (err) throw new Error(err);

        res.render('tasks-list', {
            pageTitle: 'Tasks list',
            tasksList: JSON.parse(data)
        });
    });
};

exports.getAddTask = (req, res, next) => {
    res.render('add-task', {
        pageTitle: 'Add new user'
    });
};

exports.postAddTask = (req, res, next) => {
    // const writeStream = fs.createWriteStream('tasks.json', { flags: 'a'});
    fs.readFile('tasks.json', 'utf8', (err, data) => {
        if (err) throw new Error(err);

        const existingData = JSON.parse(data);

        existingData.push({
            title: req.body.title,
            shortdescr: req.body.shortdescr,
            fulldescr: req.body.fulldescr,
            id: existingData.length + 1
        });

        fs.writeFile('tasks.json', JSON.stringify(existingData), 'utf8', (err, data) => {
            if (err) throw new Error(err);
        });
    });
    res.redirect('/');
};