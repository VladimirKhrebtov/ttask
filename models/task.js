const products = [];
const fs = require('fs');

module.exports = class Task {
    constructor(params) {
        this.title = params.title;
        this.shortdescr = params.shortdescr;
        this.fulldescr = params.fulldescr;
        this.id = params.id;
    }

    save() {
        fs.readFile('tasks.json', 'utf8', (err, data) => {
            if (err) throw new Error(err);
            if (!data.toString()) {
                fs.writeFile('tasks.json', JSON.stringify([this]), 'utf8', (err, data) => {
                    if (err) throw new Error(err);
                });
            } else {
                const existingData = JSON.parse(data);
                existingData.push(this);
                fs.writeFile('tasks.json', JSON.stringify(existingData), 'utf8', (err, data) => {
                    if (err) throw new Error(err);
                });
            }
        });
    }

    static fetchTasks(cb) {
        fs.readFile('tasks.json', (err, data) => {
            if (err) cb([]);
            cb(data);
        });
    }
};
