const fs = require('fs');

module.exports = function saveObjectToFile (filename, object) {
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) throw new Error(err);
        if (!data.toString()) {
            fs.writeFile(filename, JSON.stringify([object]), 'utf8', (err, data) => {
                if (err) throw new Error(err);
            });
        } else {
            const existingData = JSON.parse(data);
            existingData.push(object);
            console.log(existingData);
            fs.writeFile(filename, JSON.stringify(existingData), 'utf8', (err, data) => {
                if (err) throw new Error(err);
            });
        }
    });
}
