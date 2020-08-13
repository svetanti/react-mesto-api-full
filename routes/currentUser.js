const currentUser = require('express').Router();
const fs = require('fs');

let users = {};
fs.readFile('./data/users.json', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  users = JSON.parse(data);
});

currentUser.get('/users/:_id', (req, res) => {
  const user = users.find((item) => item._id === req.params._id);
  if (!user) {
    res.send({ message: 'Нет пользователя с таким id' });
    return;
  }
  res.send(user);
});

module.exports = currentUser;
