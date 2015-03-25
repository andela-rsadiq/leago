module.exports = function(app) {
  var leagueCtrl = require('../controllers/league');

  app.ExpressRouter.route('/leagues')
  .get(leagueCtrl.allLeagues)
  .post(leagueCtrl.createLeague);

  app.ExpressRouter.route('/leagues/:leagueId')
  .get(leagueCtrl.getLeague)
  .put(leagueCtrl.updateLeague)
  .delete(leagueCtrl.deleteLeague);

  app.ExpressRouter.param('leagueId', leagueCtrl.findOneLeague);
}