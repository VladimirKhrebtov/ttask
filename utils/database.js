const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

exports.dbConnection = function() {
    MongoClient.connect('mongodb+srv://johndoe:lqHFtwewjgPYk0Pi@cluster0-cmhw2.mongodb.net/test?retryWrites=true&w=majority', { useUnifiedTopology: true })
        .then(result => {
            _db = result.db();
        })
        .catch(error => console.log(error));
};

exports.getDb = function () {
    if (_db) return _db;
    throw new Error('DB connection problem');
};
