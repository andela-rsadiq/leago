var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
  name: { 
    type: String
  },

  players: [{
    type: Schema.ObjectId,
    ref: 'Player'
  }],

  numberOfGamesPlayed: {
    type: Number,
    default: 0
  },

  numberOfGoalsScored: {
    type: Number,
    default: 0
  },

  numberOfGoalsConceded: {
    type: Number,
    default: 0
  }
});

var Team = mongoose.model('Team', teamSchema);
module.exports = Team;