const { getCards } = require('../controllers/getters')
const cardsRouter = require('express').Router();
const fs = require('fs');

cardsRouter.get('/cards', getCards);

module.exports = cardsRouter;
