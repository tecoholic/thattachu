var IfaceControllers = angular.module('IfaceControllers', []);

IfaceControllers.service('courseData', function(){
    var filename = '';
    var lang='';
    return {
        getCourseFilename : function(){
            return { "filename" : filename, "lang" : lang};
        },
        setCourseFilename : function(la, name){
            filename = name;
            lang = la;
        }
    };
});

IfaceControllers.controller('CourseControl',['$scope', '$http', '$sce', 'courseData', function($scope, $http, $sce, courseData){

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

    $scope.setCourse = function(){
        // set the current course in both the localstorage and the service
        // localStorage.set('selectedCourse', $scope.coursefile);
        courseData.setCourseFilename($scope.lang, $scope.coursefile);
    };

}]);

IfaceControllers.controller('WorkbenchControl', ['$scope', '$http', '$sce', 'courseData', function($scope, $http, $sce, courseData){
    // get the course
    cData = courseData.getCourseFilename();
    // set the course parameters to match the view variables
    $http.get('./data/'+cData.lang+'/'+cData.filename).success(function(data){
        $scope.course = data;
        // TODO check local storage for last completed course or lesson and update accordingly
        $scope.instructions = $sce.trustAsHtml(data.lessons[0].instructions);
        $scope.lines = data.lessons[0].lines;
    });
    // update the lesson when clicked
    $scope.loadLesson = function(lesson){
        $scope.instructions = $sce.trustAsHtml(lesson.instructions);
        $scope.lines = lesson.lines;
    };
}]);
