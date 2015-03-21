var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
  firstName: {
    type: String,
    required: "Please enter your first name"
  },
  lastName: {
    type: String,
    required: "Please enter a your last name"
  },
  jerseyNumber: {
    type: Number,
    required: 'Please enter a jersey number'
  },
  yellowCardsObtained: {
    type: Number,
    default: 0
  },
  redCardsObtained: {
    type: Number,
    default: 0
  }
});

var Player = mongoose.model('Player', playerSchema);
module.exports = Player;
