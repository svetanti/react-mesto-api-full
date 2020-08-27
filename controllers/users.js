const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.params._id)
    .orFail()
    .catch(() => {
      throw new NotFoundError({ message: 'Нет пользователя с таким id' });
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .catch((err) => {
      throw new BadRequestError({ message: `Указаны некорректные данные при создании пользователя: ${err.message}` });
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { name, about, avatar },
    {
      new: true,
      runValidators: true,
    })
    .orFail(() => new NotFoundError({ message: 'Нет пользователя с таким id' }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        throw err;
      }
      throw new BadRequestError({ message: `Указаны некорректные данные при обновлении пользователя: ${err.message}` });
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    })
    .orFail(() => new NotFoundError({ message: 'Нет пользователя с таким id' }))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        throw err;
      }
      throw new BadRequestError({ message: `Указаны некорректные данные при обновлении аватара: ${err.message}` });
    })
    .then((newAvatar) => res.send({ data: newAvatar }))
    .catch(next);
};
