var express = require('express');
var app = express();

// Set up static folder
app.use(express.static('public'));
app.use(express.static('bower_components'));

// Add the teacher specific routes
var teacher = require('./routes/teacher');
app.use('/teacher', teacher);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Thattachu served at http://%s:%s', host, port);
});
