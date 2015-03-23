module.exports = function(app) {
  var userCtrl = require('../controllers/user');

  app.ExpressRouter.route('/users')
  .get(userCtrl.allUsers)
  .post(userCtrl.createUser);

  app.ExpressRouter.route('/users/:userId')
  .get(userCtrl.getUser)
  .put(userCtrl.updateUser)
  .delete(userCtrl.deleteUser);

  app.ExpressRouter.param('userId', userCtrl.findUser);
}