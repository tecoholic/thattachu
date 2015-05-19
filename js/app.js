$(document).ready(function(){

    // Show the course selection modal
    $('#myModal').modal({show: true, backdrop: 'static', keyboard: false});

    $.getJSON("/data/languages.json", function(d){
        for(var i=0; i<d.length; i++){
            $('#lang').append("<option value='"+d[i].code+"'>"+d[i].name+"</option>");
        }
    });

});

var tch = {};
tch.courseData = {};

tch.loadLesson = function(lname){
    if(!tch.courseData.name){
            return;
    }
    var l = tch.courseData.lessons;
    for(var i=0; i < l.length; i++){
        if(l[i].name === lname){
            $('#instructions').html(l[i].instructions);
            var lines = l[i].lines;
            $('#workbench').empty();
            for( var i=0; i<lines.length; i++){
                $('#workbench').append('<p class="line">'+lines[i]+'</p><input type="text" class="typespace" />');
            }
            return;
        }
    }
}

// populate the courses upon language selection
$('#lang').on('change', function(){
    if($("#lang").val() !== 'none'){
        $.getJSON("/data/"+$('#lang').val()+"/courselist.json", function(d){
            for(var i=0; i<d.length; i++){
                $('#courseSelect').append("<option value='"+d[i].file+"'>"+d[i].name+"</option>");
            }
        });
    }
});

// Load the course into the tutor upon course selection
$('#courseSelect').on('change', function(){
    $('#myModal').modal('hide');
    $.getJSON("/data/"+$("#lang").val()+"/"+$('#courseSelect').val(),function(course){
        // Load the lessons list to the sidebar
        $('#sidebarList').empty();
        for(var i=0; i < course.lessons.length; i++){
            $('#sidebarList').append('<li><a href="#">'+course.lessons[i].name+'</a></li>');
            // bind the new elements to load the lesson when clicked
            $('#sidebarList a').click(function(){
                tch.loadLesson($(this).text());
            });
        }
        tch.courseData = course;
        tch.loadLesson(course.lessons[0].name);
    });
});
