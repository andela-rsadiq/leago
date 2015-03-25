var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
  fullName: {
    type: String,
    required: "Please enter a your last name"
  },
  jerseyNumber: {
    type: Number,
    required: 'Please enter a jersey number',
    unique: true
  },
  yellowCardsObtained: {
    type: Number,
    default: 0
  },
  redCardsObtained: {
    type: Number,
    default: 0
  },
  deleted: {
    type: Boolean,
    default: false,
    required: true
  }
});

var Player = mongoose.model('Player', playerSchema);
module.exports = Player;
