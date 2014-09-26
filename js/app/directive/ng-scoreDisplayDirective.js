if(typeof GLOBAL__VARS__APP != "undefined" && typeof GLOBAL__VARS__APP.mainApp != "undefined"){
    GLOBAL__VARS__APP.mainApp.directive('scoreDisplay',[
        function() {
            var c = 0;
            var get_tpl = function(){
                var tpl = '<div class="item" ng-repeat="goal in goalsItemConf" ng-click="setGoal({team_id:'+c+',goal_index:$index})" >{{goal.val}}</div>';
                tpl += '<div class="clearL"></div>';
                return tpl;
            }
            return {
                restrict: 'E',
                template:get_tpl(),
                link : function (scope,element,attrs) {
                    
                }
            };
        }
    ]);
}