var Team = require('../models/teams.js');
var _ = require('lodash');

module.exports.allTeams = function(req, res) {
  Team.find(function(err, teams) {
    if(err) {
      res.send(err);
    }
    res.json(teams);
  });
};

module.exports.createTeam = function(req, res) {
  var team = new Team(req.body);

  team.save(function(err, data) {
    if(err)
      res.send(err);
    res.json(data);
  });
};

module.exports.findOne = function(req, res, next) {
  Team.findById(req.params.teamId).populate('players').exec(function(err, team) {
    if(err) {
      res.send(err);
    }
    else {
      req.team = team;
      next();
    }
  });
};

module.exports.getTeam = function(req, res) {
  res.json(req.team);
};

module.exports.updateTeam = function(req, res) {
  console.log(req.body);
  var team = req.team;
  _.extend(team, req.body);
  team.save(function(err, data) {
    if(err)
      res.send(err);
    res.json(data);
  });
}
