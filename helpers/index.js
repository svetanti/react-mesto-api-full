const fs = require('fs').promises;
const CustomError = require('../errors/CustomError');

const getFile = (file) => fs.readFile(file, 'utf8')
  .then((data) => {
    try {
      return JSON.parse(data);
    } catch (err) {
      return new CustomError(500, { message: `Произошла ошибка при парсинге JSON: ${err.message}` });
    }
  })
  .catch((err) => new CustomError(500, { message: `Произошла ошибка при чтении ${file}: ${err.message}` }));

module.exports = { getFile };

// Большое спасибо за ревью! :)
