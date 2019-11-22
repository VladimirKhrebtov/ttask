const mongodb = require('mongodb');
const getDb = require('../utils/database');

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
        const db = getDb.getDb();
        db.collection('tasks').insertOne(this)
            .then(result => {
                // console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    static update(id, params) {
        console.log(params);
        const db = getDb.getDb();
        return db.collection('tasks').updateOne({_id: mongodb.ObjectId(id)}, { $set: params });
    }

    static fetchAllTasks() {
        const db = getDb.getDb();

        return db.collection('tasks').find()
            .toArray()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    static fetchSingleTask(id) {
        const db = getDb.getDb();

        return db.collection('tasks').find({_id: new mongodb.ObjectId(id)}).next()
            .then(result => {
                // console.log(result);
                return result;
            })
            .catch(error => {
                console.log(error);
            })
    }
};
