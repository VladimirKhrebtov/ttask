const saveObjectToFile = require('../utils/utilities');
const fs = require('fs');

const getTasksFromFile = cb => {
    fs.readFile('tasks.json', (err, data) => {
        if (err || !data.toString()) cb([]);
        cb(JSON.parse(data.toString()));
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

    static fetchAllTasks(cb) {
        getTasksFromFile(cb);
    }

    static fetchSingleTask(id, cb) {
        getTasksFromFile((tasks) => {
            const task = tasks.find(t =>  t.id === id);
            cb(task);
        });
    }
};
