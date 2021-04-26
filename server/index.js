require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

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

  // API Routes
  app.use('/api', require('./api'));

  // Static middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  });

  // New socket connection
  io.on('connection', (socket) => {
    console.log(`New connection: ${socket.id}`);
    socket.on('update-content', (content) => {
      console.log('content --->', content[0]);
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
