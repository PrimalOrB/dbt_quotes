const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const noteSchema = new Schema(
  {
    noteText: {
      type: String,
      required: true,
    },
    noteBy: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = noteSchema;
