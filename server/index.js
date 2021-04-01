const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
// const { auth } = require('express-openid-connect');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
require('dotenv').config();

const port = process.env.PORT || 3000;

module.exports = app;

const buildApp = () => {
  // Logging middleware
  app.use(morgan('dev'));
  // Security for HTTP requests
  app.use(helmet());
  app.use(cors());

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Auth

  // API Routes
  app.use('/api', require('./api'));
  app.use('/auth', require('./auth'));

  // Static middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

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
  http.listen(port, () => console.log(`🚢 🚢 Listening on port ${port} 🚢 🚢`));
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
