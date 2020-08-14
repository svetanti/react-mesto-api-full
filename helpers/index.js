const fs = require('fs').promises;

const readFile = (file) => fs.readFile(file, 'utf8');

module.exports = readFile;
