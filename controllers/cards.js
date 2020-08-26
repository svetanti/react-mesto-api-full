const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .catch((err) => {
      throw new BadRequestError({ message: `Указаны некорректные данные при создании карточки: ${err.message}` });
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof BadRequestError) res.status(err.status).send(err.message);
      res.status(500).send({ message: err.message });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params._id)
    .catch(() => {
      throw new NotFoundError({ message: 'Нет карточки с таким id' });
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof NotFoundError) res.status(err.status).send(err.message);
      res.status(500).send({ message: err.message });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((likes) => res.send({ data: likes }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((likes) => res.send({ data: likes }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
