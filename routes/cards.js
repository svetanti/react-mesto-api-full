const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(7),
  }),
}), createCard);
cardsRouter.delete('/cards/:_id', deleteCard);
cardsRouter.put('/cards/:_id/likes', likeCard);
cardsRouter.delete('/cards/:_id/likes', dislikeCard);

module.exports = cardsRouter;
