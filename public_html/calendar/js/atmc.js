$(function(){
    $('#atmc').click(function(){

    	var uid = $('#userid').html();
    	var eid = $('#eventid').html();

    	$.ajax('atmc.php',   
            {
                type: 'POST',
                data:{uid:uid,eid:eid},
                cache: false,
                success: function (data) {alert("Event added to your calendar");},
                error: function () {alert('Error receiving JSON');}
            });
    });
});

