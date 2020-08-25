const users = require('express').Router();
const { getUsers, getCurrentUser, createUser } = require('../controllers/users');

users.get('/users', getUsers);
users.get('/users/:_id', getCurrentUser);
users.post('/users', createUser);

module.exports = users;
