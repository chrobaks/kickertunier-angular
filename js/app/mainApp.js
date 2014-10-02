(function() {
    "use strict";

    angular.module('mainApp', ['ui.router', 'ngGrid', 'mainAppFactory']);
    
    angular.module('mainApp').config(
        function($stateProvider, $urlRouterProvider){
            
            $urlRouterProvider.otherwise("/");
            
            $stateProvider
            .state('index', {
                url: "",
                views: {
                    "viewUser": { templateUrl: "templates/user-template.html" },
                    "viewTeam": { templateUrl: "templates/team-template.html" },
                    "viewGame": { templateUrl: "templates/game-template.html" }
                }
            });
        }
    );
})();


