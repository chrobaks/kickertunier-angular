if(typeof GLOBAL__VARS__APP != "undefined" && typeof GLOBAL__VARS__APP.mainApp != "undefined"){
    GLOBAL__VARS__APP.mainApp.factory('GameFactory',[
        'StorageFactory',
        'MessageFactory',
        function (StorageFactory, MessageFactory) {
            // STORE Game SCOPE
            var factoryScope = {};
            /**
            * private get_checkTeamNotDiff
            *
            * @returns boolean if team_1.teamname is not same team_2.teamname than false
            */
            var get_checkTeamNotDiff = function () {
                return (factoryScope.game.team_1.teamname===factoryScope.game.team_2.teamname);
            }
            /**
            * private set_gridOptions
            *
            * @description set ng-grid gridOptionsTeam
            * @returns void
            */
            var set_gridOptions = function () {
                factoryScope.gridOptionsGame = { 
                    data: 'gameData',
                    showGroupPanel: false,
                    columnDefs: [
                        {field: 'team_1', displayName: 'Team 1'},
                        {field: 'team_2', displayName: 'Team 2'},
                        {
                            displayName: 'Aktion',
                            cellTemplate: 'templates/grid-options-game-template.html'
                        }
                    ]
                };
            }
            /**
            * private set_addGameData
            *
            * @description set new game data
            * @returns void
            */
            var set_addGameData = function () {
                var newgame = {
                    team_1: factoryScope.game.team_1.teamname, 
                    team_2: factoryScope.game.team_2.teamname,
                    team_1_scores: 0,
                    team_2_scores: 0
                };
                factoryScope.gameActualTeamData = angular.copy(newgame);
                factoryScope.game = {team_1: '', team_2: ''};
                factoryScope.gameIsRunning = true;
                set_gameScoreDisplayStyle("",false);
            }
            /**
            * public set_addGame
            *
            * @description valided gameform and if ok run add func
            * @returns boolean if form not valid than false
            */
            var set_addGame = function () {
                var isok = true;
                if ( ! factoryScope.gameForm.$valid) {
                    MessageFactory.set_error("Alle Felder benötigen einen Eintrag!");
                    return false;  
                }
                if(get_checkTeamNotDiff()){
                    MessageFactory.set_error("Ein Spiel benötigt zwei Teams.");
                    factoryScope.game.team_2 = "";
                    isok = false;
                }
                
                if(isok){
                    set_addGameData();
                }
                return isok;
            }
            /**
            * public set_deleteGame
            *
            * @description 
            * @returns boolean
            */
            var set_deleteGame = function (id) {
                var res = [];
                for(var e in factoryScope.gameData){
                    if(factoryScope.gameData[e].id != id){
                        res.push(factoryScope.gameData[e]);
                    }
                }
                factoryScope.gameData = res;
                set_gridOptions();
                return true;
            }
            /**
            * public set_gameActualTeamData
            *
            * @description set goal value
            * @returns void
            */
            var set_gameActualTeamData = function(domelement,obj){
                if(factoryScope.activeDirectiveId !== "" && factoryScope.gameIsRunning === true){
                    var teamnumber = factoryScope.activeDirectiveId*1+1;
                    var goalid = obj.goal_index*1;
                    var teamscore = factoryScope.gameActualTeamData["team_"+teamnumber+"_scores"]*1;
                    var goalval = factoryScope.goalsItemConf[goalid].val*1;
                    if(teamscore+1 === goalval){
                        factoryScope.gameActualTeamData["team_"+teamnumber+"_scores"] = goalval;
                        set_gameScoreDisplayStyle(domelement,true);
                    }else if(teamscore === goalval){
                        factoryScope.gameActualTeamData["team_"+teamnumber+"_scores"] -= 1;
                        set_gameScoreDisplayStyle(domelement,false);
                    }
                }
            }
            /**
            * private set_gameScoreDisplay
            *
            * @description set scoreDisplay CSS
            * @returns void
            */
            var set_gameScoreDisplayStyle = function(domelement,isactive){
                if(domelement!==""){
                    if(isactive){
                        domelement.attributes.class.value += " active";
                    }else{
                        domelement.attributes.class.value = domelement.attributes.class.value.replace(" active",'');
                    }
                }else{
                    angular.element("score-display").find("div.item").removeClass("active");
                }
            }
            /**
            * public set_init
            *
            * @description set default scope store
            * @returns void
            */
            var set_init = function(scope){
                factoryScope = scope;
                factoryScope.gameTeamData = StorageFactory.get_storeTeamData();
                set_gridOptions();
                StorageFactory.set_storeGameScope(factoryScope);
                factoryScope.autoId = StorageFactory.funcautoId("game");
            }
            return {
                set_scopeInit: set_init,
                set_scopeAddGame: set_addGame,
                set_scopeDeleteGame: set_deleteGame,
                set_sopeGameActualTeamData: set_gameActualTeamData
            };
        }
    ]);
}