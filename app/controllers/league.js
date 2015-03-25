var League = require('../models/league');
var _ = require('lodash');

module.exports.allLeagues = function(req, res) {
  League.find(function(err, leagues) {
    if(err) {
      res.send(err);
    }
    else {
      console.log(leagues);
      //console.log(1, 'here');
      res.json(leagues);
    }
  });
};

module.exports.createLeague = function(req, res) {
  var league = new League(req.body);

  league.save(function(err, league) {
    if(err) {
      res.send(err);
    }
    else {
      res.json(league);
    }
  });
};

module.exports.findOneLeague = function(req, res, next) {
  League.findById(req.params.leagueId).populate('teams', 'events').exec(function(err, league) {
    if(err) {
      res.send(err);
    }
    else {
      req.league = league;
      next();
    }
  });
};

module.exports.getLeague = function(req, res) {
  res.json(req.league);
}

module.exports.updateLeague = function(req, res) {
  var league = req.league;
  _.extend(league, req.body);
  league.save(function(err, data) {
    if(err) {
      res.send(err);
    }
    else {
      res.json(data);
    }
  });
};

module.exports.deleteLeague = function(req, res) {
  League.remove({
    _id: req.params.leagueId
  }, function(err, league) {
    if(err) {
      res.send(err);
    }
    else {
      res.json({message: 'League has been deleted!'});
    }
  });
};