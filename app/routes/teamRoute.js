module.exports = function(app) {
  var teamsCtrl = require('../controllers/teams');

  app.ExpressRouter.route('/teams')
  .get(teamsCtrl.allTeams)
  .post(teamsCtrl.createTeam);

  app.ExpressRouter.route('/teams/:teamId')
  .get(teamsCtrl.getTeam)
  .put(teamsCtrl.updateTeam);

  app.ExpressRouter.param('teamId', teamsCtrl.findOne);
}