var thattachu = angular.module('thattachu', []);

thattachu.controller('IfaceControl', function($scope, $http, $sce){

    // check whether we have local storage and inform the user
    try{
        if(localStorage in window && window['localStorage'] !== null)
            $scope.lstoreStatus = true;
    }catch(e){
        $scope.lstoreStatus = false;
    }

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
            $scope.course = data;
            // TODO check local storage for last completed course or lesson and update accordingly
            $scope.instructions = $sce.trustAsHtml(data.lessons[0].instructions);
            $scope.lines = data.lesson[0].lines;
        });
    };

    $scope.loadLesson = function(lesson){
        $scope.instructions = $sce.trustAsHtml(lesson.instructions);
        $scope.lines = lesson.lines;
    };
});
