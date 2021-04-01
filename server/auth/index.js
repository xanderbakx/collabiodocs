const router = require('express').Router();
const { auth } = require('express-openid-connect');

const { requiresAuth } = require('express-openid-connect');

module.exports = router;

// Auth0 Config
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH_SECRET,
  baseURL: 'http://localhost:3000/auth',
  clientID: process.env.AUTH_CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res, next) => {
  try {
    res.json(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  } catch (error) {
    next(error);
  }
});

router.get('/profile', requiresAuth(), (req, res, next) => {
  try {
    res.json(JSON.stringify(req.oidc.user));
  } catch (error) {
    next(error);
  }
});
