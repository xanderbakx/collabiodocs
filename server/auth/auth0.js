const router = require('express').Router();
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

module.exports = router;

router.get(
  '/',
  passport.authenticate('auth0', { scope: 'openid email profile' }),
);

const strategy = new Auth0Strategy(
  {
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.SERVER_CLIENT_ID,
    clientSecret: process.env.SERVER_CLIENT_SECRET,
    callbackURL: process.env.AUTH0_CALLBACK_URL,
    // state: true,
  },
  (accessToken, refreshToken, extraParams, profile, done) => done(null, profile),
);

passport.use(strategy);
