/**
 * Module that provides routes for sending and recieving teacher specific
 * data and handles all the teacher routes
 */

var Course = require('../models/course');  // all the projects models

var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({extended: false});

router.get('/', function(req, res){
    res.redirect('/templates/teacher/index.html');
});

router.post('/compile', urlEncodedParser, function(req, res){
    if(!req.body) return res.sendStatus(400); // make sure we have a body

    // rebuild the form data into a course json
    var course = {};
    course.name = req.body.name;
    course.author = req.body.author;
    course.description = req.body.description;
    course.level = req.body.level;
    course.language = req.body.language;
    course.input = req.body.inputmethod;
    course.lessons = [];

    var lesson = function(id, name, ins, lines){
        function trimElement(el, idx, arr){
            arr[idx] = el.trim();
        }
        var strings = lines.split("\n");
        strings.forEach(trimElement);
        return {
            "index" : id,
            "name" : name,
            "instructions" : ins,
            "lines" : strings
        };
    };

    if(typeof(req.body.lessonName) !== 'string'){
        for(var i=0; i<req.body.lessonName.length; i++){
            var l = lesson(i, req.body.lessonName[i], req.body.instructions[i], req.body.lines[i]);
            course.lessons.push(l);
        }
    }else{
        var l2 = lesson(0, req.body.lessonName, req.body.instructions, req.body.lines );
        course.lessons.push(l2);
    }

    Course.saveCourse(course, function(msg){
        res.set({"Content-Type": "text/plain"});
        res.send(course);
    });


});

module.exports = router;
