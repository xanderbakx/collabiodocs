const router = require('express').Router();
const passport = require('passport');

module.exports = router;

router.use('/auth0', require('./auth0'));

router.get('/callback', passport.authenticate('auth0'), (req, res, next) => {
  try {
    req.session.user = req.user;
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get(
  '/login',
  passport.authenticate('auth0', { scope: 'openid email profile' }),
);

router.get('/logout', (req, res) => {
  console.log(req.session);
  req.logOut();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  if (!req.user) {
    res.status(404).send('Not logged in...');
  } else {
    res.json(req.user || {});
  }
});
