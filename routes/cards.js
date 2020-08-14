const cardsRouter = require('express').Router();
const { getCards } = require('../controllers/getters');

cardsRouter.get('/cards', getCards);

module.exports = cardsRouter;
