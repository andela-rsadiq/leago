var leaGo = angular.module('leaGo');

leaGo.controller('leagueCtrl', ['$scope', '$http', 'leaGoFactory', function($scope, $http, leaGoFactory) {
  var display = function() {
    leaGoFactory.queryLeague(function(data) {
      $scope.leagues = data;
    });
    $scope.league = {};
  };

  display();
  
  $scope.createLeague = function() {
    leaGoFactory.createLeague($scope.league).then(function(data) {
      console.log($scope.league);
      alert('New Tournament has been created!');
    }, function(error){
      alert("Sorry, an error has occurred, league was not created!");
    });
    display();
  };


    leaGoFactory.findOneLeague().then(function(data) {
      $scope.displayOneLeague = data.data.teams;
      console.log(data.data.teams);
    }, function(error) {
      alert("Sorry, an error has occurred, league was not created!");
    });
}]);

// leaGo.controller('individualLeagueCtrl', [])