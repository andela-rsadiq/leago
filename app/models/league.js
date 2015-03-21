var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leagueSchema = new Schema ({
  team_name: {
    type: String,
    required: 'Please enter your team name',
    unique: true
  }
});

var League = mongoose.model('League', leagueSchema);
module.exports = League; 