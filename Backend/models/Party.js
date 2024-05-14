const mongoose = require('mongoose');

const partySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Party = mongoose.model('Party', partySchema);

module.exports = Party;
