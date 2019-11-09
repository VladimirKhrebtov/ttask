const saveObjectToFile = require('../utils/check');
const updateObjectInFile = require('../utils/utilities');
const fs = require('fs');

const getTasksFromFile = cb => {
    fs.readFile('tasks.json', (err, data) => {
        if (err || !data.toString()) cb([]);
        cb(data);
    });
}

module.exports = class Task {
    constructor(params) {
        this.title = params.title;
        this.shortdescr = params.shortdescr;
        this.fulldescr = params.fulldescr;
    }

    save() {
        this.id = ((Math.random() * 100).toFixed(0)).toString();
        saveObjectToFile('tasks.json', this);
    }

    update(id) {
        this.id = id;
        Task.fetchAllTasks(tasks => {
            const existingTasks = JSON.parse(tasks);
            const updatedTask = existingTasks.find( t => t.id === id );
            const updatedTaskIndex = existingTasks.indexOf(updatedTask);
            existingTasks.splice(updatedTaskIndex, 1, this);
            updateObjectInFile('tasks.json', existingTasks);
        })
    }

    static fetchAllTasks(cb) {
        getTasksFromFile(cb);
    }

    static fetchSingleTask(id, cb) {
        getTasksFromFile((tasks) => {
            const existingTasks = JSON.parse(tasks);
            const task = existingTasks.find(t =>  t.id === id);
            console.log(existingTasks.indexOf(task));
            cb(task);
        });
    }
};
