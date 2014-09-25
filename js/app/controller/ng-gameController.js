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
            // SCOPE VAR gamedata stores all games
            $scope.gameData = [
                {team_1: 'Musterteam', team_2: 'Vollenergie', id: 1}
            ];
            // SCOPE VAR gameactalteamdata store activ game
            $scope.gameActualTeamData = {
                team_1: 'Kein Team',
                team_2: 'Kein Team'
            };
            // SCOPE VAR gameisrunning stores game status
            $scope.gameIsRunning = false;
            // SCOPE VAR goalsconf stores goal item
            $scope.goalsItemConf = [
                {status:0,val:'1'},
                {status:0,val:'2'},
                {status:0,val:'3'},
                {status:0,val:'4'},
                {status:0,val:'5'},
                {status:0,val:'6'},
                {status:0,val:'7'}
            ];
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
            $scope.setGoal = function () {
                console.log('setGoal:')
            }
            // INIT Game SCOPE
            GameFactory.set_scopeInit($scope);
        }
    ]);
}