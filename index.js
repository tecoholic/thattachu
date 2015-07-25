var express = require('express'),
    db = require('./models/db');
var app = express();

// setup views and template engine
app.set('views', './views');
app.set('view engine', 'jade');

// Set up static folder
app.use(express.static('public'));
app.use(express.static('bower_components'));

// Add the teacher specific routes
var teacher = require('./routes/teacher');
app.use('/teacher', teacher);


// route the deafult calls
var index = require('./routes/index');
app.use('/', index);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Thattachu served at http://%s:%s', host, port);
});
