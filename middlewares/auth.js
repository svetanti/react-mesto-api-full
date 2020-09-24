const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, 'ce361f879bb257435954f4643685003d9de6dfdd693fc48f41fe23303cd3a681');
  } catch (err) {
    throw new UnauthorizedError({ message: 'Необходима авторизация' });
  }
  req.user = payload;

  next();
};
