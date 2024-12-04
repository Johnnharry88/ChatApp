// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

secret = 'vicky';

const Auth = async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    let decoded;
    if (token) {
      decoded = jwt.verify(token, secret); // Replace with your actual secret
      const user = await User.findById(decoded.id).select('-password');
      req.user = user;
    } else {
      decoded = jwt.decode(token);
      const user = await User.findById(decoded.id).select('-password');
      req.user = user;
    }
    next();
    } catch (err) {
      console.log(`Error in Middleware ${err}`);
      res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = Auth;
