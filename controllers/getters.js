const path = require('path');
const { getFile } = require('../helpers');
const CustomError = require('../errors/CustomError');

const users = path.join(__dirname, '..', 'data', 'users.json');
const cards = path.join(__dirname, '..', 'data', 'cards.json');

const getUsers = (req, res) => {
  getFile(users)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err instanceof CustomError) {
        res.status(err.status).send(err.message);
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

const getCurrentUser = (req, res) => {
  getFile(users)
    .then((data) => {
      const user = data.find((item) => item._id === req.params._id);
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err instanceof CustomError) {
        res.status(err.status).send(err.message);
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

const getCards = (req, res) => {
  getFile(cards)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err instanceof CustomError) {
        res.status(err.status).send(err.message);
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

module.exports = {
  getUsers,
  getCurrentUser,
  getCards,
};
