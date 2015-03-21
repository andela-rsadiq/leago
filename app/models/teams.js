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
    type: Number
  },

  numberOfGoalsScored: {
    type: Number
  },

  numberOfGoalsConceeded: {
    type: Number
  }
});

var Team = mongoose.model('Team', teamSchema);
module.exports = Team;