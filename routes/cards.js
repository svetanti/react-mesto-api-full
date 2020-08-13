const cardsRouter = require('express').Router();
const fs = require('fs');

let cards = {};
fs.readFile('./data/cards.json', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  cards = JSON.parse(data);
});

cardsRouter.get('/cards', (req, res) => {
  res.send(cards);
});

module.exports = cardsRouter;
