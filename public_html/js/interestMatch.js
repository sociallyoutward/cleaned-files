$(function(){
	var curUser = $('#user').html();

	$.ajax('neighbors/getUsers.php',
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
		var newNeigh = $('<div class="profileBox"><div class="item"></div></div>');
	    newNeigh.data('fId',userID);
	    
	    newNeigh.append('<p class="name">'+intersect['name']+'</p>');
	    if(intersect['intersect'].length!=0)
	    {
		//don't display number of interests in footer
		/*
		    for(var interest in intersect['intersect']){
		    	newNeigh.append('<p class="interest">'+intersect['intersect'][interest]+'</p>');
		    }
		    */
		    newNeigh.append('<p class="percent">'+intersect['percent']+'% Match</p>');
		}
	    container.append(newNeigh);
}