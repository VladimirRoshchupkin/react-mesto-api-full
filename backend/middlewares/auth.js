const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/UnauthorizedError');

const auth = (req, _, next) => {
  // console.log('auth req', req);
  // const authorization = req.cookies.jwt;
  // const authorization = req.cookies.jwt; // req.headers.authorization || убираю заголовки
  // const authorization = req.headers.authorization.replace('Bearer', '');
  const { authorization } = req.headers;

  if (!authorization.startWith('Bearer')) { // || !authorization.startWith('Bearer') // с куками не нужен !authorization
    const err = new UnauthorizedError(`authorization required 1 ${authorization} 11 ${req.headers.authorization} 111 ${req.headers.cookies}`);
    return next(err);
  }
  // const token = authorization.replace('Bearer', ''); // убрал, т.к. теперь только куки
  const token = authorization; // оставил для сохранения прежней структуры.
  let payload;
  try {
    payload = jwt.verify(token, '123'); // как в ПР15 вынесем ключ в .env сделаю его сложнее secret-key
  } catch (e) {
    const err = new UnauthorizedError(`authorization required 2 ${token} 22 ${e}`);
    return next(err);
  }
  req.user = payload;
  next();
  return ''; // иначе eslint ругается, что нет return. Пустой return; как в вебинаре тоже ошибка.
};

module.exports = { auth };
