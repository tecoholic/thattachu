casper.test.begin('Navigation Test', 13, function suite(test){

    casper.start('http://localhost/thattachu', function(){
        test.assertTitle('Thattachu', "Thattachu page loaded");
        test.assertEquals(casper.getElementAttribute("a.btn", "href"), "#/courses", "Button to navigate to courses is present" );
        this.click("a.btn");
        console.log("Clicked the button. Navigating to the course selection page");
    });

    casper.then(function(){
        test.assertExists("form#entryForm", "The course selection form is found");
        test.assertExists("select#lang", "The language selector is present");
        test.assertExists("select#inputmethod", "The input method selector is present");
        test.assertExists("table#courselist", "The course selector is present");
        this.fill('form#entryForm', {'language' : 'en'});
        test.assertEquals(this.getFormValues('form#entryForm').language, 'en', "Choosing language English");
        this.fill('form#entryForm', {'inputmethod' : 'ipa-x-sampa'});
        test.assertEquals(this.getFormValues('form#entryForm').inputmethod, 'ipa-x-sampa', "Choosing input method X-SAMPA");

        casper.waitForResource('courselist.json', function(){
            console.log("Recieved course list");
            var courses = this.evaluate(function(){ return document.querySelectorAll('a.ng-binding').length; });
            test.assertEquals(courses, 1, "One course present");
            test.assertEquals(this.getHTML('a.ng-binding'), "Demo Course", "Course name is 'Demo Course'");
            this.clickLabel('Demo Course');
            console.log("Clicked the Demo Lesson. Navigating to the work bench.");
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
