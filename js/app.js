$(document).ready(function(){

    // Show the course selection modal
    $('#myModal').modal({show: true, backdrop: 'static', keyboard: false});

    $.getJSON("/data/languages.json", function(d){
        for(var i=0; i<d.length; i++){
            $('#lang').append("<option value='"+d[i].code+"'>"+d[i].name+"</option>");
        }
    });

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
            }
        });
    });

});
