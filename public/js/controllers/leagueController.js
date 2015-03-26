angular.module('leaGo')
  .controller('leagueCtrl', ['$scope', '$http', 'leaGoFactory', '$routeParams', function($scope, $http, leaGoFactory, $routeParams) {
    
    var display = function() {
      leaGoFactory.queryLeague(function(data) {
        $scope.leagues = data;
      });
      $scope.league = {};
    };

    var displayTeam = function() {
      if($routeParams.leagueId) {
        leaGoFactory.findTeamsInOneLeague($routeParams.leagueId).then(function(data) {
          if(data.data.teams.length === 0) {
            var alertMessage = 'There are no teams in this league yet. Please add teams using the add team form.';
          }
          else {
            alertMessage = null;
            $scope.teams = data.data.teams;
            $scope.league = data.data;
            console.log(data);
          }
        });
      }
    };
    
    $scope.createLeague = function() {
      console.log($scope.league);
      if($scope.league.name === '' && $scope.league.durationOfTournament === '') {
        alert('Please enter all league details');
      }
      else {
        leaGoFactory.createLeague($scope.league).then(function(data) {
          alert('New Tournament has been created!');
        }, function(error){
          alert("Sorry, an error has occurred, league was not created!");
        });
        display();
      }
    };

    $scope.removeLeague = function(leagueId) {
      var checkAction = confirm('Are you sure you want to delete team?');
      if(checkAction) {
        leaGoFactory.deleteLeague(leagueId).success(function(data) {
          alert('League has been deleted!');
        }).error(function(error) {
          alert('Oops, something went wrong, please try deleting again.')
        });
      }
      display();
    };

    $scope.createTeam = function() {
      leaGoFactory.createTeam($routeParams.leagueId, $scope.team).then(function(data) {
        alert('New Team has been added to league');
        console.log(data);
      }, function(error){
        alert("Sorry, an error has occurred, team was not created!");
      });
      displayTeam();
      $scope.team = {};
    },

    $scope.removeTeam = function(teamId) {
      var checkAction = confirm('Are you sure you want to delete team?');
      if(checkAction) {
        leaGoFactory.deleteTeam($routeParams.leagueId, teamId). success(function(data) {
          alert('Team has been deleted');
        }).error(function(error) {
          alert('Ooops, an error has occurred, please try again.')
        });
      }
      displayTeam();
    };

    $scope.init = function() {
      display();
      displayTeam();
      leaGoFactory.findPlayersInOneTeam($routeParams.leagueId, $routeParams.teamId).success(function(data) {
        $scope.players = data;
      });
    };

    $scope.viewPlayer = function(playerId) {
      leaGoFactory.displayPlayer($routeParams.leagueId, $routeParams.teamId, playerId). success(function(data) {
        console.log(data);
        $scope.result = data;
      }).error(function(error) {
        alert(error + ' has occurred, please try again!')
      });
    };
    $scope.init();
  }]);