describe('IfaceControl-ler tests', function(){
    
    beforeEach(module('thattachu'));

    it('should create "languagues" model with 2 languages', inject(function($controller){
        var scope = {},
            ctrl = $controller('IfaceControl', {$scope:scope});
        expect(scope.languages.langth).toEqual(2);
    }));
});
