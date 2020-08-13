const users = require("express").Router();
const fs = require("fs");

let userList = {};
fs.readFile("./data/users.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  userList = JSON.parse(data);
});

users.get("/users", (req, res) => {
  res.send(userList);
});

module.exports = users;
