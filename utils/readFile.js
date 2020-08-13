const fs = require('fs');
const path = require("path");

module.exports.readFile = () => {
  const filepath = path.join(__dirname, `${fileName}.json`);
  const data = fs.readFileSync(filepath, { encoding: 'utf8' });
  console.log(data);
};

let file = {};
fs.readFile('./data/cards.json', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  file = JSON.parse(data);
});
