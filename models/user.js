const fs = require('fs');
const saveObjectToFile = require('../utils/utilities');

const getUsersFromFile = cb => {
    fs.readFile('users.json', (err, data) => {
        if (err || !data.toString()) cb([]);
        cb(JSON.parse(data.toString()));
    })
}

module.exports = class User {
    constructor(params) {
        this.username = params.username;
        this.secondname = params.secondname;
        this.userposition = params.userposition;
    }

    save() {
        this.id = (Math.random() * 100).toFixed(0);
        saveObjectToFile('users.json', this);
    }

    static fetchUsers(cb) {
        getUsersFromFile(cb);
    }

    static fetchSingleUser(id, cb) {
        getUsersFromFile(users => {
            const user = users.find(u => u.id === id);
            cb(user);
        })
    }
}
