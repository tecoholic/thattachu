$(document).ready(function(){

    console.log('document is ready');
    // Show the course selection modal
    $('#myModal').modal({show: true, backdrop: 'static', keyboard: false});

    $.getJSON("./data/languages.json", function(d){
        for(var i=0; i<d.length; i++){
            $('#lang').append("<option value='"+d[i].code+"'>"+d[i].name+"</option>");
        }
    });

});

var tch = {};
tch.courseData = {};
tch.totalChars = 0;
tch.errors = 0;

tch.loadLesson = function(lname){
    if(!tch.courseData.name){
            return;
    }
    var l = tch.courseData.lessons;
    // reset total chars in the lesson
    tch.totalChars = 0;
    tch.errors = 0;
    for(var i=0; i < l.length; i++){
        if(l[i].name === lname){
            $('#instructions').html(l[i].instructions);
            var lines = l[i].lines;
            $('#workbench').empty();
            for( var i=0; i<lines.length; i++){
                $('#workbench').append('<div class="line"><p class="source">'+lines[i]+'</p><input type="text" class="outcome" /></div>');
            }
            // setup the input methods for all the inputs
            $('.outcome').ime();
            $(".line").bind('keydown',evaluateInput);
            return;
        }
    }
}

tch.updateAccuracy = function(){
    $("span#accuracy").text(Math.round((tch.totalChars-tch.errors)*100/tch.totalChars));
    $("span#errors").text(tch.errors);
}
// populate the courses upon language selection
$('#lang').on('change', function(){
    if($("#lang").val() !== 'none'){
        $.getJSON("./data/"+$('#lang').val()+"/courselist.json", function(d){
            for(var i=0; i<d.length; i++){
                $('#courseSelect').append("<option value='"+d[i].file+"'>"+d[i].name+"</option>");
            }
        });
    }
});

// Load the course into the tutor upon course selection
$('#courseSelect').on('change', function(){
    $('#myModal').modal('hide');
    $.getJSON("./data/"+$("#lang").val()+"/"+$('#courseSelect').val(),function(course){
        // Load the lessons list to the sidebar
        $('#sidebarList').empty();
        for(var i=0; i < course.lessons.length; i++){
            $('#sidebarList').append('<li class="list-group-item"><a href="#">'+course.lessons[i].name+'</a></li>');
            // bind the new elements to load the lesson when clicked
            $('#sidebarList a').click(function(){
                tch.loadLesson($(this).text());
            });
        }
        // Update the course metadata
        $('span#coursename').text(course.name);
        $('span#author').text(course.author);
        $("span#level").text(course.level);
        $("span#courselang").text(course.language);
        $("span#description").text(course.description);
        tch.courseData = course;
        tch.loadLesson(course.lessons[0].name);
    });
});

function evaluateInput(e){
    var source = $(this).find('.source').text();
    var outcome = $(this).find('.outcome').val();

    var typeIndex = outcome.length;
    // increament the total characters
    tch.totalChars++;

    // for any print-affecting character prevent default action
    var keys = [8,9,13,32,35,36,37,39,46,188,190,191,192,219,220,221,222,186,59,187,61,189,173];
    console.log("pressed "+e.keyCode+" with keys.indexOf "+keys.indexOf(e.keyCode));
    if( keys.indexOf(e.keyCode) != -1 || (e.keyCode >=48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90)){
        e.preventDefault();
        // Now put the appropriate key in its place
        if( typeIndex < source.length ){
            if(e.key !== source[typeIndex]){
                outcome += '*';
                tch.errors++;
            }else{
                outcome += e.key;
            }
        }else if(typeIndex === source.length){
            if( e.key !== 'Enter'){
                outcome += '*';
                tch.errors++;
            }
            // if this is the last input then disable any further input and update the accuracy
            if(!$(this).next().length){
                $(".outcome").each(function(){
                    $(this).prop('disabled', true);
                });
            }
            // in case of further lines move the cursor to the next one
            $(this).next().find('.outcome').focus();
        }
        $(this).find('.outcome').val(outcome);
    }

    // finally update the accuracy for this keystroke
    tch.updateAccuracy();
}

