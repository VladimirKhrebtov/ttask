const fs = require('fs');

module.exports = function updateObjectInFile (filename, object) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) throw new Error(err);
        if (!data.toString()) {
            fs.writeFile(filename, JSON.stringify([object]), 'utf8', (err, data) => {
                if (err) throw new Error(err);
            });
        } else {
            fs.writeFile(filename, JSON.stringify(object), 'utf8', (err, data) => {
                if (err) throw new Error(err);
            });
        }
    });
}
