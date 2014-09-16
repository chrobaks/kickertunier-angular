if(typeof GLOBAL__VARS__APP != "undefined" && typeof GLOBAL__VARS__APP.mainApp != "undefined"){
    GLOBAL__VARS__APP.mainApp.controller('gameController',[
        '$scope', 
        'GameFactory', 
        'StorageFactory',
        'MessageFactory',
            function($scope, GameFactory, StorageFactory, MessageFactory) {
            
            $scope.headertitle = "Control Game";
            $scope.formmsg = "";
            $scope.gameTeamData = [];
            $scope.gameData = [
                {team_1: 'Musterteam', team_2: 'Vollenergie', id: 1}
            ];
            $scope.gameActualTeamData = {
                team_1: 'Kein Team',
                team_2: 'Kein Team'
            };
            $scope.gameIsRunning = false;
            
            $scope.addGame = function () {
                if(GameFactory.set_scopeAddGame($scope)){
                    $scope.formmsg = "Neues Team speichern";
                }else{
                    $scope.formmsg = MessageFactory.get_error();
                }
            }
            
            $scope.deleteGame = function (id) {
                GameFactory.set_scopeDeleteGame(id, $scope);
            }
            
            $scope.gameTeamData = StorageFactory.get_storeTeamData();
            
            GameFactory.set_scopeGridOptions($scope)
            
            StorageFactory.set_storeGameScope($scope);
            $scope.gameAutoId = StorageFactory.funcautoId("game");
            
        }
    ]);
}