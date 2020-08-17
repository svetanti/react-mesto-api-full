const path = require('path');
const { getFile } = require('../helpers');

const users = path.join(__dirname, '..', 'data', 'users.json');
const cards = path.join(__dirname, '..', 'data', 'cards.json');

const getUsers = (req, res) => {
  getFile(users)
    .then((data) => {
      if (data instanceof Error) {
        res.status(data.status).send(data.message);
      }
      res.status(200).send(data);
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

const getCurrentUser = (req, res) => {
  getFile(users)
    .then((data) => {
      if (data instanceof Error) {
        res.status(data.status).send(data.message);
      }
      const user = data.find((item) => item._id === req.params._id);
      if (!user) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

const getCards = (req, res) => {
  getFile(cards)
    .then((data) => {
      if (data instanceof Error) {
        res.status(data.status).send(data.message);
      }
      res.send(data);
    })
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err}` }));
};

module.exports = {
  getUsers,
  getCurrentUser,
  getCards,
};
