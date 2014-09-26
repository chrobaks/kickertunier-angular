if(typeof GLOBAL__VARS__APP != "undefined" && typeof GLOBAL__VARS__APP.mainApp != "undefined"){
    GLOBAL__VARS__APP.mainApp.directive('scoreDisplay',[
        function() {
            var c = 0;
            var get_tpl = function(){
                var tpl = '<li class="clearL">';
                tpl += '<li class="item" ng-repeat="goal in goalsItemConf">{{goal.val}}</li>';
                tpl += '</li><li class="clearL"></li>';
                return tpl;
            }
            var set_goals = function(){
                console.log( "set_goals")
            }
            return {
                template:get_tpl(),
                link : function (scope,element,attrs) {
                    c+=1;

                    angular.forEach(element.children(), function(index) {
                        //element.children()[index].on("click",set_goals);
                        console.log("el:"+index);
                    });

                }
            };
        }
    ]);
}