var mongoose = require('mongoose');

exports.courseOfLanguage = function( lang ){
    var Course = mongoose.model('Course');
    Course.find({
        language: lang
    }, function(err, courses){
        if(err){
            console.log(err);
        } else {
            console.log(courses);
            callback("", courses);
        }
    });
};
