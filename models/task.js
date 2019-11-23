const mongodb = require('mongodb');
const getDb = require('../utils/database').getDb;

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
        const db = getDb();
        db.collection('tasks').insertOne(this)
            .then(result => {
                // console.log(result);
            })
            .catch(error => {
                console.log(error);
            })
    }

    static update(id, params) {
        const db = getDb();
        return db.collection('tasks').updateOne({_id: mongodb.ObjectId(id)}, { $set: params });
    }

    static delete(id) {
        const db = getDb();
        return db.collection('tasks').deleteOne({ _id: mongodb.ObjectId(id) })
            .then(() => {
                console.log('Task Deleted');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    static fetchAllTasks() {
        const db = getDb();

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
        const db = getDb();

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
