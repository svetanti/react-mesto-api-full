const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.params._id)
    .catch(() => {
      throw new NotFoundError({ message: 'Нет пользователя с таким id' });
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof NotFoundError) res.status(err.status).send(err.message);
      res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .catch((err) => {
      throw new BadRequestError({ message: `Указаны некорректные данные при создании пользователя: ${err.message}` });
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof BadRequestError) res.status(err.status).send(err.message);
      res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { name, about, avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .catch((err) => {
      throw new BadRequestError({ message: `Указаны некорректные данные при обновлении пользователя: ${err.message}` });
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err instanceof BadRequestError) res.status(err.status).send(err.message);
      res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .catch((err) => {
      throw new BadRequestError({ message: `Указаны некорректные данные при обновлении аватара: ${err.message}` });
    })
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch((err) => {
      if (err instanceof BadRequestError) res.status(err.status).send(err.message);
      res.status(500).send({ message: `Произошла ошибка: ${err.message}` });
    });
};
