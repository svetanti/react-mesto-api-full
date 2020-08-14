const path = require('path');
const readFile = require('../helpers');

const getUsers = (req, res) => {
  readFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then((users) => {
      res.send(JSON.parse(users));
    })
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка при загрузке полльзователей: ${err}` });
    });
};

const getCurrentUser = (req, res) => {
  readFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then((users) => {
      const user = JSON.parse(users).find((item) => item._id === req.params._id);
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка при загрузке полльзователей: ${err}` });
    });
};

const getCards = (req, res) => {
  readFile(path.join(__dirname, '..', 'data', 'cards.json'))
    .then((cards) => {
      res.send(JSON.parse(cards));
    })
    .catch((err) => {
      res.status(500).send({ message: `Произошла ошибка при загрузке карточек: ${err}` });
    });
};

module.exports = {
  getUsers,
  getCurrentUser,
  getCards,
};
