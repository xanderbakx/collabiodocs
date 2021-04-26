const router = require('express').Router();

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

module.exports = router;

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://xanderbakx.us.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://api/docs',
  issuer: 'https://xanderbakx.us.auth0.com/',
  algorithms: ['RS256'],
});

const getManagementApiJwt = () => {
  const request = require('request');
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url: 'https://xanderbakx.us.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body:
        '{"client_id":"sdbpQm2LxqUoVZVkaySsLNtacVjiTFla","client_secret":"0Re3_rned8tEDnNCcrgdv5w05XOzUX3l3kSv9_AnEgxUtzyDP81Pgz2vgQsNKQHA","audience":"https://xanderbakx.us.auth0.com/api/v2/","grant_type":"client_credentials"}',
    };

    request(options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        console.log(body);
        resolve(JSON.parse(body));
      }
    });
  });
};

router.get('/', jwtCheck, (req, res) => {
  const request = require('request');
  getManagementApiJwt().then((data) => {
    const token = data.access_token;
    const options = {
      method: 'GET',
      url: `https://xanderbakx.us.auth0.com/api/v2/users/${req.user.sub}`,
      headers: {
        authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      json: true,
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      console.log('user --->', req.user);
      res.json(body);
    });
  });
});