const { Schema, model } = require('mongoose');
const noteSchema = require('./Note');
const dateFormat = require('../utils/dateFormat');

const quoteSchema = new Schema(
  {
    createdAt: {
        type: Date,
        default: Date.now,
    },
    customerName: {
        type: String,
        required: 'Customer name required'
    },
    jNum: {
        type: Number,
    },
    description: {
        type: String,
        required: 'Description name required'
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
    },
    POQty: {
        type: Number,
    },
    statusMtl: {
        type: String,
    },
    mtlURL: {
        type: String,
    },
    completedDate: {
        type: Date,
    },
    notes: [noteSchema]
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
);

quoteSchema.virtual('noteCount').get(function() {
  return this.notes.length;
});

const Quote = model('Quote', quoteSchema);

module.exports = Quote;
