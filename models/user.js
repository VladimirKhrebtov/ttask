const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');

module.exports = class User {
    constructor(params) {
        this.username = params.username;
        this.secondname = params.secondname;
        this.userposition = params.userposition;
    }

    save() {
        const db = getDb();

        db.collection('users').insertOne(this)
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            })
    }

    static delete(id) {
        const db = getDb();
        return db.collection('users').deleteOne({ _id: new mongodb.ObjectId(id)})
            .then(() => {
                console.log('User deleted');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    static fetchUsers() {
        const db = getDb();

        return db.collection('users').find()
            .toArray()
            .then(result => {
                return result
            })
            .catch(error => {
                console.log(error);
            })
    }

    static fetchSingleUser(id) {
        const db = getDb();

        return db.collection('users').find({_id: new mongodb.ObjectId(id)}).next()
            .then(result => {
                return result;
            })
            .catch(error => {
                console.log(error);
            })
    }
}
