//File Author: Karsten Rabe

//When Bulletin Board is clicked, slideToggle options div, and make 3 links fade in with delays

$(document).ready(function(){
    animate();	
});

function animate(){
	$("#topBox").click( function(){
	    if (!$("#bottomBox").is(":animated") && !$("#thirdOne").is(":animated")) {
            makeBoxVisible();
      
            setTimeout(function(){changeOpacity("#firstOne", 250);}, 500);
            setTimeout(function(){changeOpacity("#secondOne", 300);}, 625);
			setTimeout(function(){changeOpacity("#thirdOne", 400);}, 775);
			
			setTimeout(function(){changeArrow();}, 350);
            
            //swellText('#firstOne', 100);
            //swellText('#secondOne', 100);
            //swellText('#thirdOne', 100);
            
            //setTimeout(function(){reduceText('#firstOne', 200);}, 375);
            //setTimeout(function(){reduceText('#secondOne', 200);}, 500);
            //setTimeout(function(){reduceText('#thirdOne', 200);}, 675);
            
        }
	});
};

function makeBoxVisible() {
	if ($("#bottomBox").css("opacity") == "0"){
		$("#bottomBox").toggle(300, "swing");     //default params
		$("#bottomBox").animate({
		    opacity: 1.0
	    }, 200, function(){
		    //Animation Complete
	    });
	}
	else{
		$("#bottomBox").toggle(100, "linear");
		$("#bottomBox").animate({
		    opacity: 0.0
	    }, 10, function(){
		    //Animation Complete
	    });
	};
	
};

function changeOpacity(targetDiv, duration){
	if ($(targetDiv).css("opacity") == "0"){
		$(targetDiv).animate({
			opacity: 1
		}, duration, function() {
			//Animation done
		});
	}
	else{
		$(targetDiv).animate({
			opacity: 0
		}, duration - 1325, function() {
			//Animation done
		});
	};	
};

function swellText(targetDiv, duration){
	$(targetDiv).animate({
		"font-size": "1.15em"
	}, duration, function() {
		//Animation complete
	});
};

function reduceText(targetDiv, duration){
	$(targetDiv).animate({
		"font-size": "1em"
	}, duration, function() {
		//Animation complete
	});
};

function changeArrow(){
    var originalImg = $("#appendTarget").html();
    originalImg = originalImg.substr(14, originalImg.length);
    if (originalImg.charAt(21) == "r"){
    	var string = "Bulletin Board" + originalImg.substr(0, 21) + 'left_arrow.png"' + " height='12px' " + " width='12px'>";
    	$("#appendTarget").html(string);
    }
    else{
    	var string = "Bulletin Board" + originalImg.substr(0, 21) + 'right_arrow.png"' + " height='12px' " + " width='12px'>";
    	$("#appendTarget").html(string);
    };
};





