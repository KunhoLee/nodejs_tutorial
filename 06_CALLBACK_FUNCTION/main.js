const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
    if (err) return console.errer(err);
    console.log(data.toString());
});

console.log('Program has ended');
