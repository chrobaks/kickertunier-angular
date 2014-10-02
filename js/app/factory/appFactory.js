/*
*
* MAIN APPLICATION FACTORYS
*
* # StorageFactory
* # MessageFactory
**/
(function() {
    
    "use strict";
    
    angular.module('mainAppFactory', [])
    .factory('StorageFactory', StorageFactory)
    .factory('MessageFactory', MessageFactory);
    
    function StorageFactory() {
        var scopestor = {
            userscope: {},
            teamscope: {},
            gamescope: {}
        }
        /**
        * public func_autoId
        *
        * @description closure method
        * @returns function
        */
        var func_autoId = function (key) {
            var autoid = get_autoId(key);
            var get_nextid = function(){
                var r = autoid;
                autoid+=1;
                return r
            }
            return get_nextid;
        }
        /**
        * private get_autoId
        *
        * @description get back next autoid for each scope list data
        * @returns integer
        */
        var get_autoId = function (key) {
            var r = 0;
            if(scopestor[key+"scope"][key+"Data"].length){
                for(var e in scopestor[key+"scope"][key+"Data"]){
                    if(scopestor[key+"scope"][key+"Data"][e].id>r){r=scopestor[key+"scope"][key+"Data"][e].id}
                }
            }
            return ( ! r) ? 1 : r+=1;
        }
        /**
        * private get_nickname
        *
        * @description get nickname by id
        * @returns string
        */
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
        /**
        * public get_teamname
        *
        * @description get teamname by id or flag
        * @returns string
        */
        var get_teamname = function (id) {
            var r = (arguments.length>1) ? [] : '';
            var flag = (arguments.length>1) ? arguments[1] : '';
            for(var e in scopestor.teamscope.teamData){
                if(flag == ''){
                    if(scopestor.teamscope.teamData[e].id==id){
                        r=scopestor.teamscope.teamData[e].teamname;
                        break;
                    }
                }else{
                    if(flag == '-a'){
                        r.push(scopestor.teamscope.teamData[e].teamname);
                    }
                }
            }
            return r;
        }
        /**
        * public get_teamid
        *
        * @description get teamid by teamname
        * @returns number
        */
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
        /**
        * public get_checkUserIsInTeam
        *
        * @description check if team contains user by userid
        * @returns boolean
        */
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
        /**
        * public get_checkTeamIsInActiveGame
        *
        * @description check if team is playing
        * @returns boolean
        */
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
        /**
        * public get_userData
        *
        * @returns scope userscope.userData
        */
        var get_userData = function () {
           return scopestor.userscope.userData;
        }
        /**
        * public get_teamData
        *
        * @returns scope teamscope.teamData
        */
        var get_teamData = function () {
           return scopestor.teamscope.teamData;
        }
        /**
        * public get_gameIsRunning
        *
        * @returns boolean
        */
        var get_gameIsRunning = function () {
           return scopestor.gamescope.gameIsRunning;
        }
        /**
        * public set_userScope
        *
        * @description set scopestor userscope
        * @returns void
        */
        var set_userScope = function (data) {
            scopestor.userscope = data;
        }
        /**
        * public set_teamScope
        *
        * @description set scopestor teamscope
        * @returns void
        */
        var set_teamScope = function (data) {
           scopestor.teamscope = data;
        }
        /**
        * public set_teamUserDataScope
        *
        * @description set scopestor teamscope.teamUserData
        * @returns void
        */
        var set_teamUserDataScope = function (data) {
           scopestor.teamscope.teamUserData = data;
        }
        /**
        * public set_gameScope
        *
        * @description set scopestor gamescope
        * @returns void
        */
        var set_gameScope = function (data) {
           scopestor.gamescope = data;
        }
        /**
        * public set_gameTeamDataScope
        *
        * @description set scopestor gamescope.game
        * @returns void
        */
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
            get_storeTeamName: get_teamname,
            get_storeCheckTeamIsInActiveGame: get_checkTeamIsInActiveGame,
            set_storeUserScope: set_userScope,
            set_storeTeamScope: set_teamScope,
            set_storeTeamUserDataScope: set_teamUserDataScope,
            set_storeGameScope: set_gameScope,
            set_storeGameTeamDataScope: set_gameTeamDataScope
            
        };
    }
    
    function MessageFactory() {
        var config_confirm = {
            "game_has_winner" : "Hurra! Das Team [%a1%] hat gewonnen, soll das Spiel eingetragen werden?",
            "team_delete" : "Wenn Sie das Team löschen, werden alle Spiele, an denen das Team beteiligt war, ebenfalls gelöscht! Möchten Sie das Team wirklich löschen?"
        }
        var message = {
            error: [],
            info: []
        }
        /**
        * public get_confirm
        *
        * @returns boolean
        */
        var get_confirm = function (key) {
            if(config_confirm.hasOwnProperty(key)){
                var txt = (arguments.length<2) ? config_confirm[key] : config_confirm[key].replace("[%a1%]",arguments[1]);
                return  confirm(txt);
            }else{
                return false;
            }
        }
        /**
        * public get_info
        *
        * @returns string
        */
        var get_info = function () {
            var sep = (arguments.length) ? arguments[0] : '';
            var r = message.info.join(sep);
            message.info = [];
            return r;
        }
        /**
        * public get_error
        *
        * @returns string
        */
        var get_error = function () {
            var sep = (arguments.length) ? arguments[0] : '';
            var r = message.error.join(sep);
            message.error = [];
            return r;
        }
        /**
        * public set_info
        *
        * @returns void
        */
        var set_info = function (str) {
           message.info.push(str);
        }
        /**
        * public set_error
        *
        * @returns void
        */
        var set_error = function (str) {
           message.error.push(str);
        }
    
        return {
            get_confirm: get_confirm,
            get_info: get_info,
            get_error: get_error,
            set_info: set_info,
            set_error: set_error
            
        };
    }
})()