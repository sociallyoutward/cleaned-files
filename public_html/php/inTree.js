
$.ajax('m_is.php',
    	{
    		type: 'POST',
    		data:{mid:34,iid:25,remove:true},
			cache: false,
			success: function (data) {console.log(data)},
			error: function (e) {console.log(e);}
     	});