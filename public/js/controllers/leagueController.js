angular.module('leaGo')
  .controller('leagueCtrl', ['$scope', '$http', 'leaGoFactory', '$routeParams', function($scope, $http, leaGoFactory, $routeParams) {
    $scope.teams = [];
    $scope.league = {};
    var display = function() {
      leaGoFactory.queryLeague(function(data) {
        $scope.leagues = data;
      });
      /*//$scope.league = {};
      $scope.league.durationOfTournament = '';
      $scope.league.name = '';*/
    };

    var displayTeam = function() {
      if($routeParams.leagueId) {
        leaGoFactory.findTeamsInOneLeague($routeParams.leagueId).then(function(data) {
          if(data.data.teams.length === 0) {
            $scope.alertMessage = 'There are no teams in this league yet. Please add teams using the add team form.';
          }
          else {
            //$scope.alertMessage = false;
            alertMessage = null;
            $scope.teams = data.data.teams;
            $scope.league = data.data;
            console.log(data);
          }
        });
      }
    };

    var displayPlayer = function() {
      leaGoFactory.findPlayersInOneTeam($routeParams.leagueId, $routeParams.teamId).success(function(data) {
        $scope.players = data;
      });
    };
    
    $scope.createLeague = function() {
      console.log('fsfsfd');

      if ($scope.leagueForm.$valid) {
        leaGoFactory.createLeague($scope.league).then(function(data) {
          alert('New Tournament has been created!');
        }, function(error){
          alert("Sorry, an error has occurred, league was not created!");
        });
        $scope.reset();
        display();
      } else {
        alert("There are invalid fields");
      }
      // console.log($scope.league);
      // if($scope.league.name === '' && $scope.league.durationOfTournament === '') {
      //   alert('Please enter all league details');
      // }
      // else {
      //   leaGoFactory.createLeague($scope.league).then(function(data) {
      //     alert('New Tournament has been created!');
      //   }, function(error){
      //     alert("Sorry, an error has occurred, league was not created!");
      //   });
      //  display();
      // }
    };

    $scope.reset = function() {
      $scope.league = { name: '', durationOfTournament: '' };
    }

    $scope.edit = function(leagueId) {
      $scope.editLeagueDiv = true;
      $scope.getLeague(leagueId);
      $scope.editLeague = function() {
        $scope.editLeagueDiv = false;
        leaGoFactory.updateLeague(leagueId, $scope.updateLeague).success(function(data) {
          alert('League deatils have been updated.');
          $scope.updateLeague = {};
          display();
        }).error(function(data) {
          alert('An error has occurred!');
        });
      }
    };

    $scope.editTeamInit = function(teamId) {
      $scope.editTeamDiv = true;
      $scope.getTeam(teamId);
      $scope.editTeam = function() {
        $scope.editTeamDiv = false;
        leaGoFactory.updateTeam($routeParams.leagueId, teamId, $scope.updateTeam).success(function(data) {
          alert('Team details have been updated.');
          $scope.updateTeam = {};
          displayTeam();
        }).error(function(data) {
          alert('An error has occurred.')
        });
      }
    };

    $scope.addPlayerInit = function() {
      $scope.addPlayerDiv = true;
    };

    $scope.hidePlayerForm = function() {
      $scope.addPlayerDiv = false;
    }

    $scope.addPlayer = function() {
      leaGoFactory.addPlayertoTeam($routeParams.leagueId, $routeParams.teamId, $scope.player).success(function(data) {
        console.log(data);
        displayPlayer();
      }).error(function(error) {
        alert('An error has occurred, player was not created, please try again.');
      });
    };

    $scope.getLeague = function(leagueId){
      leaGoFactory.getOneLeague(leagueId).success(function(data) {
        console.log(data);
        $scope.updateLeague = data;
      }).error(function(data) {
        //do something
      });
    };

    $scope.getTeam = function(teamId) {
      leaGoFactory.getOneTeam($routeParams.leagueId, teamId).success(function(data) {
        $scope.updateTeam = data;
        console.log(data);
      }).error(function(data) {
        //do something
      });
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

    $scope.addTeam = function() {
      leaGoFactory.createTeam($routeParams.leagueId, $scope.team).then(function(data) {
        alert('New Team has been added to league');
        // console.log(data);
        $scope.teams.push(data.data);
        
      }, function(error){
        alert("Sorry, an error has occurred, team was not created!");
      });
      // displayTeam();
    },

    $scope.removeTeam = function(teamId) {
      var checkAction = confirm('Are you sure you want to delete team?');
      if(checkAction) {
        leaGoFactory.deleteTeam($routeParams.leagueId, teamId). success(function(data) {
          console.log(data);
          // _.remove($scope.teams, function(){})
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