var clearInterests = function()
{
    var member = $('#user').html();
    member = parseInt(member);
    $.ajax('/php/m_is.php',
    	{
    		type: 'POST',
			data: {clear:1,mid:member},
			cache: false,
			success: function (data) {alert("cleared interests");},
			error: function () {alert('clear failed');}
     	}); 
};
function clearAllInts() {
	$('#check').remove();
	$('#sure').append('<div id="check"><p>Are you sure?</p><button onclick="clearInterests()" >Yes</button></div>');
};