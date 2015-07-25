
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
    res.render('index');
});

router.get('/courses', function(req, res){
    res.render('courses');
});


module.exports = router;
