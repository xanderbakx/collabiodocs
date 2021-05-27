const mongoose = require('mongoose');

const { Schema } = mongoose;

const documentSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;
