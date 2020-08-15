const path = require('path');
const { getFile } = require('../helpers');

const users = path.join(__dirname, '..', 'data', 'users.json');
const cards = path.join(__dirname, '..', 'data', 'cards.json');

const getUsers = (req, res) => {
  getFile(users)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

const checkCurrentUser = (req, res, next) => {
  getFile(users)
    .then((data) => {
      const user = data.find((item) => item._id === req.params._id);
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      next();
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

const getCurrentUser = (req, res) => {
  getFile(users)
    .then((data) => {
      const user = data.find((item) => item._id === req.params._id);
      res.send(user);
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

const getCards = (req, res) => {
  getFile(cards)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

module.exports = {
  getUsers,
  checkCurrentUser,
  getCurrentUser,
  getCards,
};
