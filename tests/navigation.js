casper.test.begin('Navigation Test', 11, function suite(test){

    casper.start('http://0.0.0.0:8000', function(){
        test.assertTitle('Thattachu', "Thattachu page loaded");
        test.assertEquals(casper.getElementAttribute("a.btn", "href"), "#/courses/", "Button to navigate to courses is present" );
        this.click("a.btn");
        console.log("Clicked the button. Navigating to the course selection page");
    });

    casper.then(function(){
        test.assertExists("form#entryForm", "The course selection form is found");
        test.assertExists("select#lang", "The language selector is present");
        test.assertExists("select#courseSelect", "The course selector is present");
        test.assertEquals(casper.getElementAttribute("a.btn", "href"), "#/workbench/", "Button to navigate to workbench is present" );
        casper.waitForResource('languages.json', function(){
            this.fill('form#entryForm', {'language' : 'en'});
            test.assertEquals(this.getFormValues('form#entryForm').language, 'en', "Language is set to English");
        });
        casper.waitForResource('courselist.json', function(){
            this.fill('form#entryForm', {'course' : 'demo.json'});
            test.assertEquals(this.getFormValues('form#entryForm').course, 'demo.json', "Course is set to Demo");
            this.click("a.btn");
            console.log("Clicked the workbench button. Navigating to the workbench.");
        });
    });

    casper.then(function(){
        casper.waitForResource('demo.json', function(){
            test.assertSelectorHasText("#coursename", "Demo Course", "Demo Course has been loaded.");
            test.assertSelectorHasText("#instructions", "Welcome to the first lesson in QWERTY", "First lesson loaded by default");
            this.clickLabel("Middle DK");
            test.assertSelectorHasText("#instructions", "This is the second lesson of the QWERTY", "Next lesson loade when link clicked");
        });
    });

    casper.run(function(){
        test.done();
    });
});
