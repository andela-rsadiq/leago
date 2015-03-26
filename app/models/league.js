var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leagueSchema = new Schema ({
  name: {
    type: String,
    required: "Please enter a name for the tournament!"
  },
  
  durationOfTournament: {
    type: String,
    required: true
  },

  games: [{
    type: Schema.ObjectId,
    ref: 'Game'
  }],

  teams: [{
    type: Schema.ObjectId,
    ref: 'Team'
  }]
});

var League = mongoose.model('League', leagueSchema);
module.exports = League; 