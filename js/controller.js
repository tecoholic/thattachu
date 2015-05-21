var thattachu = angular.module('thattachu', []);

thattachu.controller('IfaceControl', function($scope, $http){
    $http.get('./data/languages.json').success(function(data){
        $scope.languages = data;
        $scope.lang = 'none';
    });

    $scope.loadCourseList = function(){
        $http.get('./data/'+$scope.lang+'/courselist.json').success(function(data){
            $scope.courses = data;
            $scope.coursefile = 'none';
        });
    };

    $scope.loadCourse = function(){
        $http.get('./data/'+$scope.lang+'/'+$scope.coursefile).success(function(data){
            // Bootstrap/jQuery code
            $("#myModal").modal('hide');
        });
    };
});
