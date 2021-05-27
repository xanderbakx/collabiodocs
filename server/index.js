require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const passport = require('passport');

const app = express();

let server;

if (process.env.NODE_ENV === 'development') {
  const key = fs.readFileSync(path.join(__dirname, '/key.pem'));
  const cert = fs.readFileSync(path.join(__dirname, '/cert.pem'));
  server = require('https').createServer({ key, cert }, app);
} else if (process.env.NODE_ENV === 'production') {
  server = require('http').Server(app);
}

const io = require('socket.io')(server);
const db = require('./db');

const port = process.env.PORT || 3000;

module.exports = app;

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: true,
  saveUninitialized: false,
};

const buildApp = () => {
  // Logging middleware
  app.use(morgan('dev'));
  // Security for HTTP requests
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.use(cors());

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(session(sessionConfig));

  // passport.use(strategy);
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  // Static middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // API Routes
  app.use('/api', require('./api'));
  app.use('/auth', require('./auth'));

  // index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  // New socket connection
  io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on('join-room', (room) => {
      console.log('room', room);
      // User joins document room
      socket.join(room);
      // Changes to document
      socket.on('update-content', (content) => {
        // Broadcast event to document room
        socket.broadcast.to(room).emit('update-content', content);
      });
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  // Error handling
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
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

// Listening on PORT
const listening = () => {
  // Server
  server.listen(port, () => console.log(`🚢 🚢 Listening on port ${port} 🚢 🚢`));
};

async function bootApp() {
  try {
    await db();
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
