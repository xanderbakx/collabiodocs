const mongoose = require('mongoose');

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = db;
