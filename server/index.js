const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors')
const mongoose = require('mongoose');
const path = require('path');
// const session = require('express-session');
const port = process.env.PORT || 3000;
// const passport = require('passport');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

module.exports = app;

// Development Secrets
if (process.env.NODE_ENV !== 'production') require('../secrets');

const uri = `mongodb+srv://xanderbakx:${process.env.PASSWORD}@documents.rqw8b.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;



const buildApp = () => {
  // Logging middleware
  app.use(morgan('dev'));
  // Security for HTTP requests
  app.use(helmet());
  app.use(cors())

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Session middleware
  // app.use(
  //   session({
  //     secret: process.env.SESSION_SECRET || 'a big secret',
  //     store: dbStore,
  //     resave: false,
  //     saveUninitialized: false,
  //   })
  // );

  // Initialize Passport
  // app.use(passport.initialize());
  // app.use(passport.session());

  // auth and api
  // app.use('/auth', require('./auth'));
  app.use('/api', require('./api'));

  // Static middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

    // New socket connection
    io.on('connection', (socket) => {
      console.log(`New connection: ${socket.id}`);
      socket.on('update-content', (content) => {
        // Broadcast event
        io.emit('update-content', content);
      });
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });

    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

  // 404 Error
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not Found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  // Error handling
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};



// Listening on PORT
const listening = () => {
  // Server
  const server = http.listen(port, () =>
    console.log(`🚢 🚢 Listening on port ${port} 🚢 🚢`)
  );
};

async function bootApp() {
  try {
    await buildApp();
    await listening();
  } catch (error) {
    console.error(error);
  }
}

if (require.main === module) {
  bootApp();
} else {
  buildApp();
}
