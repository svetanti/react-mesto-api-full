const currentUser = require('express').Router();
const { getCurrentUser, checkCurrentUser } = require('../controllers/getters');

currentUser.get('/users/:_id', checkCurrentUser);
currentUser.get('/users/:_id', getCurrentUser);

module.exports = currentUser;
