const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const auth = (req, _, next) => {
  const authorization = req.cookies.jwt; // req.headers.authorization || убираю заголовки
  if (!authorization) { // || !authorization.startWith('Bearer') // с куками не нужен
    const err = new UnauthorizedError(`authorization required 2 ${authorization}`);
    return next(err);
  }
  // const token = authorization.replace('Bearer', ''); убрал, т.к. теперь только куки
  const token = authorization; // оставил для сохранения прежней структуры.
  let payload;
  try {
    payload = jwt.verify(token, 'secret-key'); // как в ПР15 вынесем ключ в .env сделаю его сложнее
  } catch (e) {
    const err = new UnauthorizedError(`authorization required 2 ${token}`);
    return next(err);
  }
  req.user = payload;
  next();
  return ''; // иначе eslint ругается, что нет return. Пустой return; как в вебинаре тоже ошибка.
};

module.exports = { auth };
