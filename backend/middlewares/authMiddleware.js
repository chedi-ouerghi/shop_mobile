const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    console.log('No token provided');
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  console.log('Token:', token);

  jwt.verify(token, 'secretKeyChedi', (err, decoded) => {
    if (err) {
      console.log('Invalid token');
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  });
};

module.exports = { authenticate };
