const fs = require('fs').promises;

const readFile = file => {
  return fs.readFile(file, 'utf8');
}

module.exports = readFile;