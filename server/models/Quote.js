const { Schema, model } = require('mongoose');
const noteSchema = require('./Note');
const dateFormat = require('../utils/dateFormat');

const quoteSchema = new Schema(
  {
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp)
    },
    customerName: {
        type: String,
    },
    jNum: {
        type: Number,
    },
    description: {
        type: String,
    },
    priority: {
        type: Number,
        min: 1,
        max: 5
    },
    additionalNotes: {
        type: String,
    },
    pcsURL: {
        type: String,
    },
    crmURL: {
        type: String,
    },
    status: {
        type: String,
    },
    PODate: {
        type: Date,
        get: timestamp => dateFormat(timestamp)
    },
    POQty: {
        type: Number,
    },
    notes: [noteSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

quoteSchema.virtual('noteCount').get(function() {
  return this.notes.length;
});

const Quote = model('Quote', quoteSchema);

module.exports = Quote;
