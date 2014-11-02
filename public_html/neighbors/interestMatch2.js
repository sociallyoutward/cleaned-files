
$(function(){
	var curUser = $('#user').html();

	$.ajax('getUsers.php',
    	{
    		type: 'GET',
    		data:{curUser:curUser},
			cache: false,
			success: function (data) {createDivs(JSON.parse(data));},
			error: function (e) {console.log(e);}
     	});

	
});

var createDivs = function(intersect){

	console.log(intersect);
	for(var user in intersect)
	{
		generateNeighbor(user,intersect[user]);
	}
}

var generateNeighbor = function(userID,intersect){

		var container = $('#container');
		var newNeigh = $('<div class="profileBox"><div class="item"><div class="name">'+intersect['name']+'</div>');
	    newNeigh.data('fId',userID);
	    
	    newNeigh.append('<div class="boxContent"><img src="https://graph.facebook.com/<?php echo $user; ?>/picture?height=198&width=198"><div>');
	    
	    if(intersect['intersect'] >= 0)
	    {
		/*
		    for(var interest in intersect['intersect']){
		    	newNeigh.append('<p class="interest">'+intersect['intersect'][interest]+'</p>');
		    }
		    */
		    newNeigh.append('<div class="percent" style="margin-top: -10px;">'+intersect['percent']+'%<div class="web"><img src="../assets/web-small.png" style="height: 15px;" /></div><div class="bubble"><img src="../assets/message-small.png" style="height: 15px;" /></div></div></div>');
		}
	     else{
		newNeigh.append('<div class="percent" style="margin-top: -10px;">'+intersect['percent']+'%<div class="web"><img src="../assets/web-small.png" style="height: 15px;" /></div><div class="bubble"><img src="../assets/message-small.png" style="height: 15px;" /></div></div></div>');
	     }
	    container.append(newNeigh);
}