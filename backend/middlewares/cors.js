const allowedCors = [
  'https://api.adps.students.nomoredomains.sbs/',
  'http://api.adps.students.nomoredomains.sbs/',
  'https://api.adps.students.nomoredomains.sbs',
  'http://api.adps.students.nomoredomains.sbs',
  'https://adps.students.nomoreparties.sbs/',
  'http://adps.students.nomoreparties.sbs/',
  'https://adps.students.nomoreparties.sbs',
  'http://adps.students.nomoreparties.sbs',
  'http://localhost:3000',
  'https://localhost:3000',
  'localhost:3000',
  '62.84.118.128',
  'http://62.84.118.128/',
  'https://62.84.118.128/',
  'http://62.84.118.128',
  'https://62.84.118.128',
  'https://api.adps.students.nomoredomains.sbs/users/me',
];

const corsRules = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};

module.exports = {
  corsRules,
};
