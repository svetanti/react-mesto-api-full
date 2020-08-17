const currentUser = require('express').Router();
const { getCurrentUser } = require('../controllers/getters');

currentUser.get('/users/:_id', getCurrentUser);

module.exports = currentUser;
