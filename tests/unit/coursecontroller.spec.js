describe("CourseController", function(){
    beforeEach( module("thattachu") );

    var $controller, courseData, $scope, controller;
    beforeEach(inject(function(_$controller_, _courseData_){
        $controller = _$controller_;
        courseData = _courseData_;

        $scope = {};
        controller = $controller( "CourseControl", { $scope: $scope });
    }));

    describe("> fucntion populateCourses", function(){
        it( "should populate input methods of a language when selected", function(){
            $scope.lang = "ta";
            $scope.populateInputMethods();
            expect($scope.methods.length).toEqual( 5 );
            $scope.lang = "en";
            $scope.populateInputMethods();
            expect($scope.methods.length).toEqual( 2 );
        });

    });

    describe( "> function setCourse", function(){
        it("should save course data local storage and courseData service", function(){
            $scope.lang = "en";
            $scope.setCourse({ "file" : "demo.json"});
            expect(localStorage.getItem("currentCourse")).toMatch( /demo.json/ );
            expect( courseData.getCourseFilename().filename ).toMatch( /demo.json/ );
        });
    });
});
