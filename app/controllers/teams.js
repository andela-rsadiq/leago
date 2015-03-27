var Team = require('../models/teams');
var League = require('../models/league');
var _ = require('lodash');

module.exports.allTeams = function(req, res) {
  Team.find(function(err, teams) {
    if(err) {
      res.send(err);
    }
    else {
      res.json(teams);   
    }
  });
  //res.json(req.league.teams)
};

module.exports.createTeam = function(req, res) {
  /*var team = new Team(req.body);

  team.save(function(err, data) {
    if(err) {
      res.send(err);
    }
    res.json(data);
  });*/

  var league = req.league;

  var team = new Team(req.body);

  team.save(function(err, data) {
    if (err) {
      res.send(err);
    }
    else {
      league.teams.push(team);
      league.save(function(err) {
        if(err) {
          res.send(err);
        }
        else {
          res.json(data); 
        }
      });
    }
  });
};

module.exports.findOne = function(req, res, next) {
  Team.findById(req.params.teamId).populate('players', '_id, fullName').exec(function(err, team) {
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
  var team = req.team;
  _.extend(team, req.body);
  team.save(function(err, data) {
    if(err) {
      res.send(err);
    }
    else {
      res.json(data);
    }
  });
};

module.exports.deleteTeam = function(req, res) {
  Team.remove({
    _id: req.params.teamId
  }, function(err, team) {
    if(err) {
      res.send(err);
    }
    else {
      res.json(team);
    }
  });
};