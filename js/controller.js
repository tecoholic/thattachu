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

    if(!$.ime){
        console.error("Error:IME is not available");
        // TODO improve UX here
    }
    // check whether we have local storage and inform the user
    try{
        if(localStorage in window && window['localStorage'] !== null)
            $scope.lstoreStatus = true;
    }catch(e){
        $scope.lstoreStatus = false;
    }

    var langObj = $.ime.languages;
    var inputs = $.ime.sources;
    var langIndex;
    $scope.languages = [];
    for(langIndex in langObj){
        $scope.languages.push({ "code" : langIndex, "name" : langObj[langIndex].autonym });
    }
    $scope.lang = "";

    $scope.populateInputMethods = function(){
        $scope.methods = [];
        var inputsOfLang = langObj[$scope.lang].inputmethods;
        inputsOfLang.forEach(function(ele, index, arr){
            $scope.methods.push({ "code" : ele, "name" : inputs[ele].name });
        });
        $scope.inmethod = "";//set default to "Select an input"
    };

    $scope.populateCourses = function(){
        $http.get('./data/'+$scope.lang+'/courselist.json').success(function(data){
            $scope.courselist = data;
        });
    };

    $scope.setCourse = function(course){
        // localStorage.set('selectedCourse', $scope.coursefile);
        courseData.setCourseFilename($scope.lang, course.file);
    }

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
