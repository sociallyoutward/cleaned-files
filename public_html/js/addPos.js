

var interestID;

//Add plus button to page
function appendPlus() {
	var im = new Image;
	im.src = '../assets/add.png';                                          //Image path
	$("#plusDiv").html('<img src="' + im.src + '" ' + ' id="plsimg" />');  //Insert image into DOM
};

$(document).on('click', '#plsimg', function() {                        //register click to new DOM node
	regClicker(); 
	//imgConfig();                                                     //Handle click
});

function removePlus() {
	$("#plusDiv").empty();
	$("#plusDiv").hide();
	
};

//TEMP FUNCTIONS TO LET PEOPLE KNOW STATUS
$(document).on('click', '.first', function() {
	finishAdding(interestID);
});
$(document).on('click', '.rot', function() {
	alert('Removing interest not functional yet!');
});

//move plusDiv to proper position
function positionDiv() {
	var $plus = $("#plusDiv");
	
	$plus.show();
	
	var left = getLeft() + getWidth() - 68 + 'px';
    $plus.css('left', left);
    var top = getTop() + getHeight() - 60 + 'px';
    $plus.css('top', top);
};

$(window).resize(function() {
	setTimeout(function(){
		resizer();
	},1000);
});
function resizer() {                                       //Make sure plus image stays in correct position when page moves
	var $plus = $("#plusDiv");
	if ($plus.is(':visible')) {
		$plus.css('left', getLeft() + getWidth() - 68);
    	$plus.css('top', getTop() + getHeight() - 60);
    	console.log('resized!');
	};
};

//compute canvas coordinates
function getLeft() {
	var posX = Math.floor($('#myCanvas').position().left);
	return posX;
};
function getTop() {
	var posY = Math.floor($('#myCanvas').position().top);
	return posY;
};

//compute height and width
function getHeight() {
	var h = Math.floor($("#myCanvas").height());
	return h;
};
function getWidth() {
	var w = Math.floor($("#myCanvas").width());
	return w;
};

function regClicker() {                       //Handle clicks on plus image.
	var $ed = $("#editInt");
	var $dim = $('#dimScreen');
	if (!$ed.is(':visible')) {
		$ed.show('slow');
		$dim.show();
		$("#plusDiv").hide('slow');
	}
	else {
		$ed.hide('slow');
		$dim.hide();
	};
};

// Configure correct add / remove buttons when popup appears
function imgConfig() {
	var list = [];
	var list2 = [];
	var has = document.getElementsByClassName('has');
	var not = document.getElementsByClassName('hasNot');
	for (var i = 0; i<has.length; i++) {
		list[i] = has.item(i);
	};
	for (var i = 0; i<not.length; i++) {
		list2[i] = not.item(i);
	};
	for (var i = 0; i<list.length; i++) {
		var img = list[i].getElementsByTagName('img');
		var first = img.item(0);
		first.className += ' none';
	};
	for (var i = 0; i<list2.length; i++) {
		var img = list2[i].getElementsByTagName('img');
		var sec = img.item(1);
		sec.className += ' none';
	};
};


function editInterests (id) {             //put plus on page and position
	interestID = id;
	appendPlus();
	positionDiv();
};

$(document).mouseup(function (e) {          //Handle page clicks when the edit interest popup is visible.
    var $int = $("#editInt");               //popup element
    var $dim = $('#dimScreen');             //Background screen dim

    if (!($int.is(e.target)) && ($int.has(e.target).length === 0) && $int.is(':visible')) {    //If click is not on the element or any of its DOM children
        $int.hide('slow');                                          //Hide it
        $dim.hide();                                        //Remove dim
        $('#plusDiv').show('slow');
    }
});
