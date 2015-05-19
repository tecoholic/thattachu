casper.test.begin('Thattachu Entry modal loading', 8, function suite(test){
    casper.start("http://0.0.0.0:8000/", function(){
        test.assertTitle("Thattachu", "Yeah! Thattachu is being served");
        casper.waitForResource('jquery.min.js',function(){
            casper.wait(100,function(){
                test.assertVisible('#myModal', 'The entry form is visible');
            });
        });
        test.assertEquals(this.getFormValues('form#entryForm').language, 'none', "No language Selected");
        test.assertEquals(this.getFormValues('form#entryForm').course, 'none', "No course selected");
    });


    casper.then(function(){
        this.fill('form#entryForm', {'language' : 'en'});
        test.assertEquals(this.getFormValues('form#entryForm').language, 'en', "Language is set to English");
        casper.waitForResource('courselist.json', function(){
            this.fill('form#entryForm', {'course' : 'demo.json'});
            test.assertEquals(this.getFormValues('form#entryForm').course, 'demo.json', "Course is set to Demo");
        });
    });

    casper.then(function(){
        casper.waitWhileVisible('#myModal', function(){
            test.assertNotVisible('#myModal', 'The entry form is closed');
        });
        casper.waitForResource('demo.json', function(){
            test.assertElementCount('#sidebar li', 2, 'The sidebar list populated');
        });
    });

    casper.run(function(){
        test.done();
    });
});

