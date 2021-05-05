const router = require('express').Router();

// const jwt = require('express-jwt');
// const jwks = require('jwks-rsa');
const { Document } = require('../db/models');

module.exports = router;

// const jwtCheck = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: 'https://xanderbakx.us.auth0.com/.well-known/jwks.json',
//   }),
//   audience: 'https://api/docs',
//   issuer: 'https://xanderbakx.us.auth0.com/',
//   algorithms: ['RS256'],
// });

// const getManagementApiJwt = () => {
//   const request = require('request');
//   return new Promise((resolve, reject) => {
//     const options = {
//       method: 'POST',
//       url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
//       headers: { 'content-type': 'application/json' },
//       body: JSON.stringify({
//         client_id: process.env.SERVER_CLIENT_ID,
//         client_secret: process.env.SERVER_CLIENT_SECRET,
//         audience: 'https://xanderbakx.us.auth0.com/api/v2/',
//         grant_type: 'client_credentials',
//       }),
//     };

//     request(options, (error, response, body) => {
//       if (error) {
//         reject(error);
//       } else {
//         console.log(body);
//         resolve(JSON.parse(body));
//       }
//     });
//   });
// };

// GET all documents
router.get('/', async (req, res, next) => {
  // const request = require('request');
  // getManagementApiJwt().then((data) => {
  //   const token = data.access_token;
  //   const options = {
  //     method: 'GET',
  //     url: `https://xanderbakx.us.auth0.com/api/v2/documents/${req.user.sub}`,
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //       'content-type': 'application/json',
  //     },
  //     json: true,
  //   };

  //   request(options, (error, response, body) => {
  //     if (error) throw new Error(error);
  //     console.log('user --->', req.user);
  //     res.json(body);
  //   });
  // });

  try {
    const { user } = req;
    if (user) {
      console.log('doc-user --->', user);
    }
    const documents = await Document.find();
    res.json(documents);
  } catch (error) {
    next(error);
  }
});

// GET ONE document
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const document = await Document.findOne({
      _id: id,
    });
    res.json(document);
  } catch (error) {
    next(error);
  }
});

// CREATE document
router.post('/', async (req, res, next) => {
  try {
    const document = await Document.create(req.body);
    res.json(document);
  } catch (error) {
    next(error);
  }
});

// UPDATE ONE document
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const document = await Document.findOne({
      _id: id,
    });
    if (!document) {
      res.sendStatus(404);
    } else {
      await Document.updateOne(
        {
          _id: id,
        },
        req.body,
      );
      res.json(document);
    }
  } catch (error) {
    next(error);
  }
});

// DELETE ONE document
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await Document.deleteOne({
      _id: id,
    });
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});
