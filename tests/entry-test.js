casper.test.begin('Thattachu Entry modal loading', 14, function suite(test){

    // open the page and make sure that it asks for language and course
    casper.start("http://0.0.0.0:8000/", function(){
        test.assertTitle("Thattachu", "Yeah! Thattachu is being served");
        casper.waitForResource('jquery.min.js',function(){
            casper.waitUntilVisible('#myModal', function(){
                test.assertVisible('#myModal', 'The entry form is visible');
            });
        });
        test.assertEquals(this.getFormValues('form#entryForm').language, 'none', "No language Selected");
        test.assertEquals(this.getFormValues('form#entryForm').course, 'none', "No course selected");
    });

    // fill in the language and course
    casper.then(function(){
        this.fill('form#entryForm', {'language' : 'en'});
        test.assertEquals(this.getFormValues('form#entryForm').language, 'en', "Language is set to English");
        casper.waitForResource('courselist.json', function(){
            this.fill('form#entryForm', {'course' : 'demo.json'});
            test.assertEquals(this.getFormValues('form#entryForm').course, 'demo.json', "Course is set to Demo");
        });
    });

    // the modal dialog is closed and the lessons are loaded into the sidebar
    // and the first lesson by default is opened
    casper.then(function(){
        casper.waitWhileVisible('#myModal', function(){
            test.assertNotVisible('#myModal', 'The entry form is closed');
        });
        casper.waitForResource('demo.json', function(){
            test.assertElementCount('#sidebar li a', 2, 'The sidebar list populated');
            test.assertEquals(casper.getHTML('#instructions'),
                "Welcome to the first lesson in QWERTY Touch Typing. Keep your left index finger on <kbd>f</kbd> and your right index finger on <kbd>j</kbd>.",
                "The first lesson instruction is loaded.");
            // there should be as many lines and typespaces as in the json
            test.assertElementCount('p.line', 6);
            test.assertElementCount('input.typespace', 6);
        });
    });

    // The instructions and the workbench should be populated as per the lesson selection
    casper.then(function(){
        this.clickLabel("Middle DK", "a");
        test.assertEquals(casper.getHTML('#instructions'),
            "This is the second lesson of the QWERTY. Keep the left index finger on <kbd>d</kbd> and yout right index finger on <kbd>k</kbd>.",
            "Update the instructions as per lesson 2");
        test.assertElementCount('p.line', 7, "Update the key lines as per lesson 2");
        test.assertElementCount('input.typespace', 7, "Update the type spaces as per lesson 2");
    });

    casper.run(function(){
        test.done();
    });
});

