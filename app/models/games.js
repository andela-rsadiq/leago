var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gamesSchema = new Schema({
  teamOne: {
    type: String,
    required: true
  },
  teamTwo: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now,
    required: true
  },
  teamOneScore: {
    type: Number,
    required: true
  },
  teamTwoScore: {
    type: Number,
    required: true
  },
  hasTakenPlace: {
    type: Boolean,
    required: true
  }
});

var Games = mongoose.model('Game', gamesSchema);
module.exports = Games;