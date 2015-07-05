var express = require('express');
var app = express();

// Set up static folder
app.use(express.static('public'));
app.use(express.static('bower_components'));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Thattachu served at http://%s:%s', host, port);
});
