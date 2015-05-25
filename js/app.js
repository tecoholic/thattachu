var thattachu = angular.module('thattachu', [
        'ngRoute',
        'IfaceControllers'
        ]);

thattachu.config(['$routeProvider',
        function($routeProvider){
            $routeProvider.
                when('/', {
                    templateUrl: 'templates/welcome.html'
                }).
                when('/courses', {
                    templateUrl: 'templates/course_select.html',
                    controller: 'CourseControl'
                }).
                when('/workbench', {
                    templateUrl: 'templates/workbench.html',
                    controller: 'WorkbenchControl'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }]);
