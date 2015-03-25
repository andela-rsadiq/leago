/*angular.module('leaGo')
  .controller('signUpCtrl', ['$scope', '$http', 'leaGoFactory', function($scope, $http, leaGoFactory) {
    $scope.user = {};
    $scope.league = {};
    $scope.submitSignUpDetails = function() {
      console.log($scope.user);
      leaGoFactory.createUser($scope.user).then(function(data) {
        $scope.signInSuccessMessage = 'New user had been successfully created!'
        alert($scope.signInSuccessMessage)
      }, function(error) {
        console.log(error.data);
        $scope.signInError = error.data.message;
        alert($scope.signInError);
      });
      $scope.user = {};
    };

    $scope.submitSignInDetails = function() {
      leaGoFactory.query($scope.user.userName)
    }

    $scope.createEvent = function() {
      console.log($scope.league);
      leaGoFactory.createLeague($scope.league);
      $scope.league = {};
    }
  }]);*/