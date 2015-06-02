describe( 'courseData service', function(){
    beforeEach( module( "thattachu" ) );

    var courseData;

    beforeEach( inject( function(_courseData_){
        courseData = _courseData_;
    }));

    describe("> functions", function(){
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

            it( "should not log anything when both data are sent", function(){
                courseData.setCourseFilename( "ta", "demo.jso" );
                expect( console.error ).not.toHaveBeenCalled();
            });
        });

        describe( "> get function", function(){

            it('should return defined object with empty filename and lang when no data set', function(){
                expect( courseData.getCourseFilename().lang ).toBeDefined();
                expect( courseData.getCourseFilename().lang ).toMatch( '' );
                expect( courseData.getCourseFilename().filename ).toBeDefined();
                expect( courseData.getCourseFilename().filename ).toMatch( '' );
            });

            it('should return the set data', function(){
                courseData.setCourseFilename( 'en', 'test.json' );
                expect( courseData.getCourseFilename() ).toEqual( { lang: "en", filename: "test.json"} );
                courseData.setCourseFilename( 'ta', 'data.json' );
                expect( courseData.getCourseFilename() ).toEqual( { lang: "ta", filename: "data.json"} );
            });

        });

    });

});
