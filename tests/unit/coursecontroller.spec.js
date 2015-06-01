describe("CourseController", function(){
    beforeEach( module("thattachu") );

    var $controller, courseData;
    beforeEach(inject(function(_$controller_, _courseData_){
        $controller = _$controller_;
        courseData = _courseData_;
    }));

    describe("courseData service functions", function(){
        beforeEach(inject(function(_courseData_){
            courseData = _courseData_;
        }));

        it("should have the get and set courseFilename functions",function(){
            expect(courseData.getCourseFilename).toBeDefined();
            expect(courseData.setCourseFilename).toBeDefined();
        });


        describe("just the set function", function(){
            beforeEach(function(){
                spyOn( console, "error" );
            });

            it("should log error on NO data", function(){
                courseData.setCourseFilename();
                expect( console.error ).toHaveBeenCalled();
            });

            it("should log error on only one parameter", function(){
                courseData.setCourseFilename( "en" );
                expect( console.error ).toHaveBeenCalled();
            });

            it( "should log error when any parameter is undefined", function(){
                var b;
                courseData.setCourseFilename( "en", b);
                expect( console.error ).toHaveBeenCalled();
                courseData.setCourseFilename( b, "en" );
                expect( console.error ).toHaveBeenCalled();
            });
        });

    });

    // Assuming jQuery IME data to be sane and not mocking them here
    describe("Languages, inputs, courses", function(){

        var $scope, controller;
        var store = {};

        beforeEach(function(){
            $scope = {};
            controller = $controller( "CourseControl", { $scope: $scope });
        });

        it( "should load all the input methods of the set language", function(){
            expect($scope.languages.length).not.toEqual( 0 );
        } );

        it( "should populate input methods of a language when selected", function(){
            $scope.lang = "ta";
            $scope.populateInputMethods();
            expect($scope.methods.length).toEqual( 5 );
            $scope.lang = "en";
            $scope.populateInputMethods();
            expect($scope.methods.length).toEqual( 2 );
        });

        it("should save course data local storage and courseData service", function(){
            $scope.lang = "en";
            $scope.setCourse({ "file" : "demo.json"});
            expect(localStorage.getItem("currentCourse")).toMatch( /demo.json/ );
            expect( courseData.getCourseFilename().filename ).toMatch( /demo.json/ );
        });

    });

});
