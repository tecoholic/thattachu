var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    name: String,
    author: String,
    level: Number,
    description: String,
    language: String,
    input: String,
    lessons: [{
        index: Number,
        name: String,
        lines: Array,
        instructions: String
    }]
});

mongoose.model('Course', courseSchema);
mongoose.connect('mongodb://localhost/thattachu');
