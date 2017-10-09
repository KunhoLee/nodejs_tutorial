const fs = require('fs'),
      data = fs.readFileSync('input.txt');

console.log(data.toString());
console.log('Program has ended');
