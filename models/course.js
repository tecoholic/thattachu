var mongoose = require('mongoose');

exports.courseOfLanguage = function(lang, callback){
    var Course = mongoose.model('Course');
    Course.find({
        language: lang
    }, function(err, courses){
        if(err){
            console.log(err);
            callback(err, []);
        } else {
            console.log(courses);
            callback("", courses);
        }
    });
};

exports.saveCourse = function(course, callback){
    var Course = mongoose.model('Course');
    var newCourse = new Course(course);
    newCourse.save(function (err, newCourse){
        if (err){
            console.log(err);
            callback(err);
        } else {
            console.log(newCourse);
            callback('OK');
        }
    });
};
