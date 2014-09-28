/*
*
* MAIN APPLICATION FACTORYS
*
* # StorageFactory
* # MessageFactory
**/
angular.module('mainAppFactory', [])
.factory('StorageFactory', function () {
    var scopestor = {
        userscope: {},
        teamscope: {},
        gamescope: {}
    }
    var func_autoId = function (key) {
        var autoid = get_autoId(key);
        var get_nextid = function(){
            var r = autoid;
            autoid+=1;
            return r
        }
        return get_nextid;
    }
    var get_autoId = function (key) {
        var r = 0;
        if(scopestor[key+"scope"][key+"Data"].length){
            for(var e in scopestor[key+"scope"][key+"Data"]){
                if(scopestor[key+"scope"][key+"Data"][e].id>r){r=scopestor[key+"scope"][key+"Data"][e].id}
            }
        }
        return ( ! r) ? 1 : r+=1;
    }
    var get_nickname = function (id) {
        var r = "";
        for(var e in scopestor.userscope.userData){
            if(scopestor.userscope.userData[e].id==id){
                r=scopestor.userscope.userData[e].nickname;
                break;
            }
        }
        return r;
    }
    var get_teamname = function (id) {
        var r = "";
        for(var e in scopestor.teamscope.teamData){
            if(scopestor.teamscope.teamData[e].id==id){
                r=scopestor.teamscope.teamData[e].teamname;
                break;
            }
        }
        return r;
    }
    var get_teamid = function (teamname) {
        var r = "";
        for(var e in scopestor.teamscope.teamData){
            if(scopestor.teamscope.teamData[e].teamname==teamname){
                r=scopestor.teamscope.teamData[e].id;
                break;
            }
        }
        return r;
    }
    var get_checkUserIsInTeam = function (userid) {
        var isin = false;
        var ncknm = get_nickname(userid);
        if(ncknm){
            for(var e in scopestor.teamscope.teamData){
                if(scopestor.teamscope.teamData[e].player_1==ncknm || scopestor.teamscope.teamData[e].player_2==ncknm){
                    isin = true;
                    break;
                }
            }
        }
        return isin;
    }
    var get_checkTeamIsInActiveGame = function (teamid) {
        var isin = false;
        if(get_gameIsRunning()){
            var tmnm = get_teamname(teamid);
            if(tmnm){
                console.log(scopestor.gamescope.gameActualTeamData,tmnm)
                isin = ( scopestor.gamescope.gameActualTeamData.team_1===tmnm || scopestor.gamescope.gameActualTeamData.team_2===tmnm ) ? true : false;
            }
        }
        return isin;
    }
    var get_userData = function () {
       return scopestor.userscope.userData;
    }
    var get_teamData = function () {
       return scopestor.teamscope.teamData;
    }
    var get_gameIsRunning = function () {
       return scopestor.gamescope.gameIsRunning;
    }
    var set_userScope = function (data) {
        scopestor.userscope = data;
    }
    var set_teamScope = function (data) {
       scopestor.teamscope = data;
    }
    var set_teamUserDataScope = function (data) {
       scopestor.teamscope.teamUserData = data;
    }
    var set_gameScope = function (data) {
       scopestor.gamescope = data;
    }
    var set_gameTeamDataScope = function (data) {
        scopestor.gamescope.gameTeamData = data;
        var findTeam1 = 0;
        var findTeam2 = 0;
        if(scopestor.gamescope.hasOwnProperty('game')){
            findTeam1=(scopestor.gamescope.game.hasOwnProperty('team_1')) ? 1: 0;
            findTeam2=(scopestor.gamescope.game.hasOwnProperty('team_2')) ? 1: 0;
        }
        for( var m in scopestor.gamescope.gameTeamData ){
            if(findTeam1===1 && scopestor.gamescope.gameTeamData[m].teamname === scopestor.gamescope.game.team_1.teamname){
                findTeam1=2;
            } 
            if(findTeam2===1 && scopestor.gamescope.gameTeamData[m].teamname === scopestor.gamescope.game.team_2.teamname){
                findTeam2=2;
            }
        }
        if(findTeam1===1){
            scopestor.gamescope.game.team_1="";
        }
        if(findTeam2===1){
            scopestor.gamescope.game.team_2="";
        }
    }

    return {
        funcautoId: func_autoId,
        get_storeCheckUserIsInTeam: get_checkUserIsInTeam,
        get_storeUserData: get_userData,
        get_storeTeamData: get_teamData,
        get_storeTeamId: get_teamid,
        get_storeCheckTeamIsInActiveGame: get_checkTeamIsInActiveGame,
        set_storeUserScope: set_userScope,
        set_storeTeamScope: set_teamScope,
        set_storeTeamUserDataScope: set_teamUserDataScope,
        set_storeGameScope: set_gameScope,
        set_storeGameTeamDataScope: set_gameTeamDataScope
        
    };
}).factory('MessageFactory', function () {
    var message = {
        error: [],
        info: []
    }
    var get_info = function () {
        var sep = (arguments.length) ? arguments[0] : '';
        var r = message.info.join(sep);
        message.info = [];
        return r;
    }
    var get_error = function () {
        var sep = (arguments.length) ? arguments[0] : '';
        var r = message.error.join(sep);
        message.error = [];
        return r;
    }
    var set_info = function (str) {
       message.info.push(str);
    }
    var set_error = function (str) {
       message.error.push(str);
    }

    return {
        get_info: get_info,
        get_error: get_error,
        set_info: set_info,
        set_error: set_error
        
    };
});