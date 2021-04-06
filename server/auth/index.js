const router = require('express').Router();
const Joi = require('joi');
const bcrypt = require('bcryptjs');
// const jwt = require('express-jwt');
// const jwks = require('jwks-rsa');
const { User } = require('../db/models');

module.exports = router;

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// const jwtCheck = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: 'https://xanderbakx.us.auth0.com/.well-known/jwks.json',
//   }),
//   audience: 'https://auth',
//   issuer: 'https://xanderbakx.us.auth0.com/',
//   algorithms: ['RS256'],
// });

router.get('/', (req, res) => {
  res.json({
    message: '🔐',
  });
});

router.post('/signup', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await schema.validateAsync(req.body);
    const userExists = await User.findOne({
      email,
    });
    if (userExists) {
      const error = new Error(
        'That email already has an account. Sign up using a different email.',
      );
      next(error);
    } else {
      // hash password and create user
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      const user = await User.create({
        email,
        password: hashed,
      });
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
});

// router.post('/login', async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     await schema.validateAsync(req.body);
//     const user = await User.findOne({
//       email,
//     });
//   } catch (error) {
//     next(error);
//   }
// });
