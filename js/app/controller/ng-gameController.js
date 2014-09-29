if(typeof GLOBAL__VARS__APP != "undefined" && typeof GLOBAL__VARS__APP.mainApp != "undefined"){
    GLOBAL__VARS__APP.mainApp.controller('gameController',[
        '$scope', 
        'GameFactory', 
        'MessageFactory',
            function($scope, GameFactory, MessageFactory) {
            // SCOPE VAR headertitle  show controller header titel
            $scope.headertitle = "Control Game";
            // SCOPE VAR formmsg show formular messages
            $scope.formmsg = "Neues Spiel starten";
            // SCOPE VAR gameteamdata stores all teams
            $scope.gameTeamData = [];
            // SCOPE VAR gamescoredata stores games score list
            $scope.gameScoreData = [];
            // SCOPE VAR gamedata stores all games
            $scope.gameData = [
                {team_win: 'Ateam',team_1: 'Ateam', team_2: 'Vollenergie', result: '7 : 1', id: 1},
                {team_win: 'Vollenergie',team_1: 'Ateam', team_2: 'Vollenergie', result: '3 : 7', id: 2}
            ];
            // SCOPE VAR gameactualteamdata store activ game
            $scope.gameActualTeamData = {};
            // SCOPE VAR gameisrunning stores game status
            $scope.gameIsRunning = false;
            // SCOPE VAR goalsconf stores goal item
            // array.length is max goals pro game
            $scope.goalsItemConf = [
                {val:'1'},
                {val:'2'},
                {val:'3'},
                {val:'4'},
                {val:'5'},
                {val:'6'},
                {val:'7'}
            ];
            // SCOPE VAR activeDirectiveId 
            // contains activ scoreDisplay index
            $scope.activeDirectiveId = '';
            // ADD ACTIVE GAME
            $scope.addGame = function () {
                if(GameFactory.set_scopeAddGame()){
                    $scope.formmsg = "Neues Spiel starten";
                }else{
                    $scope.formmsg = MessageFactory.get_error();
                }
            }
            // DELETE GAME
            $scope.deleteGame = function (id) {
                GameFactory.set_scopeDeleteGame(id);
            }
            // SET GOAL
            $scope.setGoal = function (obj, $event) {
                GameFactory.set_sopeGameActualTeamData($event.target,obj);
            }
            // INIT Game SCOPE
            GameFactory.set_scopeInit($scope);
        }
    ]);
}