thattachu.controller('FormController', ['$scope', function($scope){

    var languages = $.ime.languages;
    var langCode;
    $scope.languages = [];
    $scope.course = {}; // define course so we can bundle all form values into the json object
    // define the defaults so we don't see empty select options and helps in change and validation
    $scope.course.level = 0;
    $scope.course.language = '';
    $scope.course.input = '';
    for( langCode in languages ){
        $scope.languages.push({"code": langCode, "autonym" : languages[langCode].autonym});
    }

    $scope.populateInputs = function(){
         $scope.inputs = [];
         for(langCode in languages){
         }
         var inputsOfLang = languages[$scope.course.language.split("-")[0]].inputmethods;
         inputsOfLang.forEach(function(ele, index, arr){
                $scope.inputs.push({ "code" : ele, "name" : $.ime.sources[ele].name });
         });
         $scope.input = "";//set default to "Select an input"


    };
    $scope.course.lessons = [];

    var lesson = function(){};
    lesson.index = 0;
    lesson.name = '';
    lesson.instructions = '';
    lesson.lines = [];

    var lessonIndex = 0;

    $scope.addLesson = function(){
        // add a new lesson
        lessonIndex++;
        var newLesson = new lesson();
        newLesson.index = lessonIndex;
        $scope.course.lessons.push( newLesson );
    };

    // adds the first lesson
    $scope.addLesson();

    $scope.removeLesson = function(index){
        for(var i=0; i<$scope.course.lessons.length; i++){
            if($scope.course.lessons[i].index === index){
                $scope.course.lessons.splice(i,1);
            }
        }
    };

    $scope.setIME = function(){
         // also load the IME dom with only selected language
        var langId = $scope.course.language.split("-")[0];
        var inputId = $scope.course.input.split("|")[1];
        $('input, textarea').ime({languages: [langId]});
        $('input, textarea').each(function(){
            var imeObj = $(this).data('ime');
            imeObj.setLanguage(langId);
            imeObj.load( inputId ).done(function(){
                imeObj.setIM( inputId );
                imeObj.enable();
            });
        });
    };

}]);

// adds jquery ime plugin to the input fields
$(document).ready(function(){
        $.ime.defaults.imePath = "./jquery.ime/";
});
