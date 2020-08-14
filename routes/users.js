const users = require('express').Router();
const { getUsers } = require('../controllers/getters')

users.get('/users', getUsers);

module.exports = users;
