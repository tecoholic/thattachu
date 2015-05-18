$(document).ready(function(){

    // Show the course selection modal
    $('#myModal').modal({show: true, backdrop: 'static', keyboard: false});

    $.getJSON("/data/languages.json", function(d){
        for(var i=0; i<d.length; i++){
            $('#lang').append("<option value='"+d[i].code+"'>"+d[i].name+"</option>");
        }
    });

    // populate the courses upon language selection
    $('#lang').change(function(){
        if($("#lang").val() !== 'none'){
            $.getJSON("/data/"+$('#lang').val()+"/courselist.json", function(d){
                for(var i=0; i<d.length; i++){
                    $('#course').append("<option value='"+d[i].filename+"'>"+d[i].name+"</option>");
                }
            });
        }
    });

    // Load the course into the tutor upon course selection
    $('#course').change(function(){
        if($('#course').val()){
            $.getJSON("/data/"+$("#lang").val()+"/"+$('#course').val(),function(){
             //TODO load the lessons into the workspace
            });
        }
    });

});
