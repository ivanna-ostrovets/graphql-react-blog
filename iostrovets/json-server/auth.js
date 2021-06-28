const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  if (req.path === '/login') return next();

  const token = req.headers.authorization;

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) return res.sendStatus(403);

    return next();
  });
}

function generateAccessToken(userId) {
  return jwt.sign(userId, process.env.JWT_SECRET);
}

module.exports = {
  verifyToken,
  generateAccessToken,
};
