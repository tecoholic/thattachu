describe('CourseController', function(){
    beforeEach( module('thattachu') );

    var $controller;
    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
    }));

    describe('$scope.languages', function(){

        var $scope, controller;

        beforeEach(function(){
            $scope = {};
            controller = $controller( 'CourseControl', { $scope: $scope });
        });

        it( 'should load all the input methods of the set language', function(){
            expect($scope.languages.length).not.toEqual( 0 );
        } );

        it( 'should load all the input methods of a language when selected', function(){
            $scope.lang = "ta";
            $scope.populateInputMethods();
            expect($scope.methods.length).toEqual( 5 );
        });
    });

});
