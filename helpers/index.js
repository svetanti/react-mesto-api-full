const fs = require('fs').promises;
const CustomError = require('../errors/CustomError');

const getFile = (file) => fs.readFile(file, 'utf8')
  .catch((err) => {
    throw new CustomError(500, { message: `Произошла ошибка при чтении ${file}: ${err.message}` });
  })
  .then((data) => {
    try {
      return JSON.parse(data);
    } catch (err) {
      throw new CustomError(500, { message: `Произошла ошибка при парсинге JSON: ${err.message}` });
    }
  });

module.exports = { getFile };

// Добрый день! Ещё раз спасибо за ревью и отдельно – за подробный разбор обработки ошибок.
// Для меня это сложная тема, но благодаря вашим объяснениям стало значительно понятнее :)
// P.S. Очень надеюсь, что в этот раз не допустила критических ошибок :)
