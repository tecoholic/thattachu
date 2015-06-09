var IfaceControllers = angular.module('IfaceControllers', []);

IfaceControllers.factory('courseData', function(){
    var filename = '';
    var lang='';
    return {
        getCourseFilename : function(){
            return { "filename" : filename, "lang" : lang};
        },
        setCourseFilename : function(la, name){
            if(typeof la === 'undefined' || typeof name === 'undefined' || la.length === 0 || name.length === 0 ){
                console.error("Insufficient course data sent.\n lang="+la+", filename="+name+"\n.Check your courselist.json");
            }
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

    // course table intial parameters
    $scope.reverse = false;
    $scope.orderParam = 'id';
    $scope.courseReqMade = false;

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
        $scope.courseReqMade = true;
        $http.get('./data/'+$scope.lang+'/courselist.json?nocache='+(new Date()).getTime()).success(function(data){
            $scope.courselist = data;
            $scope.courseDataRecieved = true;
        });
    };

    $scope.setCourse = function(course){
        localStorage.setItem('currentCourse', $scope.lang+"|"+course.file);
        courseData.setCourseFilename($scope.lang, course.file);
    }

}]);

IfaceControllers.controller('WorkbenchControl', ['$scope', '$http', '$sce', 'courseData', function($scope, $http, $sce, courseData){
    // get the course
    var cData = courseData.getCourseFilename();
    var localCourse = localStorage.getItem( 'currentCourse' );
    var localLesson = localStorage.getItem( 'currentLesson' );

    // check are we getting data from CourseController
    if(typeof cData.lang === 'undefined' ||
        typeof cData.filename === 'undefined' ||
        cData.lang.length === 0 ||
        cData.filename.length === 0)
    {
        // check if we have any localstorage lessons
        if( localCourse === null ||
           localCourse.length === 0 ||
           localLesson === null ||
           localLesson.length === 0 )
        { // if we don't show error and exit
           $scope.noCourseData = true;
           return;
        }
        else
        { // if we have local data load it to cData
           cData.lang = localCourse.split('|')[0];
           cData.filename = localCourse.split('|')[1];
           cData.lesson = localLesson;
        }
    }

    // function to check local storage and return the current lesson
    function getLesson( course ){
        if( localCourse ){
            if( localCourse.split("|")[1] === cData.filename ){
                 for( var i=0; i<course.lessons.length; i++ ){
                    if( course.lessons[i].name === localLesson ){
                        $scope.currentLessonIndex = i;
                        return course.lessons[i];
                    }
                 }
            }
        }
        return course.lessons[0];
    }
    // if course data is available countinue as normal
    $scope.noCourseData = false;
    $scope.currentLessonIndex = 0;
    // set the course parameters to match the view variables
    $http.get('./data/'+cData.lang+'/'+cData.filename+"?nocache="+(new Date()).getTime()).success(function(data){
        $scope.course = data;
        $scope.loadLesson( getLesson(data) );

    });
    // update the lesson when clicked
    $scope.loadLesson = function(lesson){
        $scope.instructions = $sce.trustAsHtml(lesson.instructions);
        $scope.lines = lesson.lines;
        $scope.currentLessonIndex = lesson.index;
        localStorage.setItem('currentLesson', lesson.name );
    };

    $scope.bindIME = function( $event ){
        var langId = $scope.course.language.split('-')[0];
        var inputId  = $scope.course.input.split('|')[1];

        $.ime.defaults.imePath = './bower_components/jquery.ime/';
        $($event.target).ime({languages: [langId]});
        var imeObject = $($event.target).data('ime');
        imeObject.setLanguage(langId);
        imeObject.load( inputId ).done(function(){
            imeObject.setIM(inputId);
            imeObject.enable();
        });
    };
}]);
