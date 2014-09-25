if(typeof GLOBAL__VARS__APP != "undefined" && typeof GLOBAL__VARS__APP.mainApp != "undefined"){
    GLOBAL__VARS__APP.mainApp.directive('scoreDisplay',[
        function() {
            var c = 0;
            var get_tpl = function(){
                var tpl = '<ul class="goal-display"><li class="clearL">';
                tpl += '<li class="item" ng-repeat="goal in goalsItemConf" ng-click="setGoal({scoreDisplayId:'+c+'})">{{goal.val}}</li>';
                tpl += '</li><li class="clearL"></li></ul>';
                return tpl;
            }
            return {
                template:get_tpl(),
                link : function (scope,element,attrs) {
                    c+=1;
                    console.log('scoreDisplay:'+element)
                }
            };
        }
    ]);
}