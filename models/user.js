const fs = require('fs');

module.exports = class User {
    constructor(params) {
        this.username = params.username;
        this.secondname = params.secondname;
        this.userposition = params.userposition;
    }

    save() {
        fs.readFile('users.json', 'utf8', (err, data) => {
            if (err) throw new Error(err);
            if (!data.toString()) {
                fs.writeFile('users.json', JSON.stringify([this]), 'utf8', (err, data) => {
                    if (err) throw new Error(err);
                });
            } else {
                const existingData = JSON.parse(data);
                existingData.push(this);
                fs.writeFile('users.json', JSON.stringify(existingData), 'utf8', (err, data) => {
                    if (err) throw new Error(err);
                });
            }
        });
    }

    static fetchUsers(cb) {
        fs.readFile('users.json', (err, data) => {
            if (err) cb([]);
            cb(data);
        });
    }
}
