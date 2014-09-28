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
            * @description set ng-grid gridOptionsGame , gridOptionsGameScore
            * @returns void
            */
            var set_gridOptions = function () {
                factoryScope.gridOptionsGame = { 
                    data: 'gameData',
                    showGroupPanel: false,
                    columnDefs: [
                        {field: 'team_1', displayName: 'Team 1'},
                        {field: 'team_2', displayName: 'Team 2'},
                        {field: 'result', displayName: 'Ergebnis'},
                        {
                            displayName: 'Aktion',
                            cellTemplate: 'templates/grid-options-game-template.html'
                        }
                    ]
                };
                factoryScope.gridOptionsGameScore = { 
                    data: 'gameScoreData',
                    showGroupPanel: false,
                    sortInfo: { fields: ['totalpoints'], directions: ['desc']},
                    columnDefs: [
                        {field: 'teamname', displayName: 'Teamname'},
                        {field: 'gamecounts', displayName: 'Anzahl Spiele'},
                        {field: 'totalpoints', displayName: 'Punkte'}
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
                set_gameScoreList();
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
                    var gameHasWinner = false;
                    if(teamscore+1 === goalval){
                        factoryScope.gameActualTeamData["team_"+teamnumber+"_scores"] = goalval;
                        set_gameScoreDisplayStyle(domelement,true);
                        if(goalval===factoryScope.goalsItemConf.length){
                           gameHasWinner = true;
                        }
                    }else if(teamscore === goalval){
                        factoryScope.gameActualTeamData["team_"+teamnumber+"_scores"] -= 1;
                        set_gameScoreDisplayStyle(domelement,false);
                    }
                    
                    if(gameHasWinner){
                        set_gameWinner();
                    }
                }
            }
            /**
            * private set_gameWinner
            *
            * @description set game winner to gameData
            * @returns void
            */
            var set_gameWinner = function(){
                var gamelist_arg = {
                    team_win:(factoryScope.gameActualTeamData.team_1_scores>factoryScope.gameActualTeamData.team_2_scores)? factoryScope.gameActualTeamData.team_1:factoryScope.gameActualTeamData.team_2,
                    team_1: factoryScope.gameActualTeamData.team_1, 
                    team_2: factoryScope.gameActualTeamData.team_2, 
                    result: factoryScope.gameActualTeamData.team_1_scores+' : '+factoryScope.gameActualTeamData.team_2_scores, 
                    id: factoryScope.autoId()
                }
                factoryScope.gameData.push(gamelist_arg);
                factoryScope.gameActualTeamData = {
                    team_1: 'Kein Team',
                    team_2: 'Kein Team',
                    team_1_scores: 0,
                    team_2_scores: 0
                };
                factoryScope.gameIsRunning === false;
                set_gameScoreList();
                set_gridOptions();
                set_gameScoreDisplayStyle("",false);
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
            * private set_gameScoreList
            *
            * @description set scoreList Data
            * @returns void
            */
            var set_gameScoreList = function(){
                var list = [];
                var teamid_1 = '';
                var teamid_2 = '';
                factoryScope.gameScoreData = [];
                if(factoryScope.gameData.length){
                    for(var e in factoryScope.gameData){
                        teamid_1 = StorageFactory.get_storeTeamId(factoryScope.gameData[e].team_1);
                        teamid_2 = StorageFactory.get_storeTeamId(factoryScope.gameData[e].team_2);
                        // SET FIRST TEAM
                        if(typeof list[teamid_1] !== 'undefined'){
                            list[teamid_1].gamecounts += 1;
                        }else if(typeof list[teamid_1] === 'undefined'){
                            list[teamid_1] = {teamname: factoryScope.gameData[e].team_1, gamecounts: 1, totalpoints: 0};
                        }
                        if(factoryScope.gameData[e].team_1===factoryScope.gameData[e].team_win){
                            list[teamid_1].totalpoints += 1;
                        }
                        // SET SECOND TEAM
                        if(typeof list[teamid_2] !== 'undefined'){
                            list[teamid_2].gamecounts += 1;
                        }else if(typeof list[teamid_2] === 'undefined'){
                            list[teamid_2] = {teamname: factoryScope.gameData[e].team_2, gamecounts: 1, totalpoints: 0};
                        }
                        if(factoryScope.gameData[e].team_2===factoryScope.gameData[e].team_win){
                            list[teamid_2].totalpoints += 1;
                        }
                        
                    }
                    for(var n in list){
                        factoryScope.gameScoreData.push(list[n]);
                    }
                }
            }
            /**
            * private set_gameDataHasTeamCeck
            *
            * @description set check gamedata to gameteamdata
            * @returns void
            */
            var set_gameDataHasTeamCeck = function(){
                var teams = [],teamsc = [],gamedata_new = [];
                for( var e in factoryScope.gameData){
                    if(teams.indexOf(factoryScope.gameData[e].team_1) == -1){
                        teams.push(factoryScope.gameData[e].team_1);
                    }
                    if(teams.indexOf(factoryScope.gameData[e].team_2) == -1){
                        teams.push(factoryScope.gameData[e].team_2);
                    }
                }
                for(var t in factoryScope.gameTeamData){
                    if(teams.indexOf(factoryScope.gameTeamData[t].teamname) !== -1){
                        teamsc.push(factoryScope.gameTeamData[t].teamname);
                    }
                }
                teams = teamsc;
                for( var n in factoryScope.gameData){
                    if(teams.indexOf(factoryScope.gameData[n].team_1) !== -1  && teams.indexOf(factoryScope.gameData[n].team_2) !== -1 ){
                        gamedata_new.push(factoryScope.gameData[n]);
                    }
                }
                if(gamedata_new.length < factoryScope.gameData.length){
                    console.log(teams.join(','));
                    factoryScope.gameData = gamedata_new;
                    set_gameScoreList();
                    set_gridOptions();
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
                set_gameScoreList();
                set_gridOptions();
                StorageFactory.set_storeGameScope(factoryScope);
                factoryScope.autoId = StorageFactory.funcautoId("game");
                factoryScope.$watch('gameTeamData',
                    function(){
                        set_gameDataHasTeamCeck();
                    },
                    true
                );
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