module.exports = function(app) {
  var teamsCtrl = require('../controllers/teams');

  app.ExpressRouter.route('/api/leagues/:leagueId/teams')
  .get(teamsCtrl.allTeams)
  .post(teamsCtrl.createTeam);

  app.ExpressRouter.route('/api/leagues/:leagueId/teams/:teamId')
  .get(teamsCtrl.getTeam)
  .put(teamsCtrl.updateTeam)
  .delete(teamsCtrl.deleteTeam);

  app.ExpressRouter.param('teamId', teamsCtrl.findOne);
}