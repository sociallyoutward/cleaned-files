//File Author: Karsten Rabe

//Make body height and width equal to browser viewport

var currentPage = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

$(document).ready(function(){
	fitViewportToScreenSize();
	fixNavCanvasSize();
	if (currentPage == "memberprofile.php") {
		canvasUpForVisibility();
	}
	
});

$(window).resize(function (){
	fitViewportToScreenSize();
	fixNavCanvasSize();
	
});

var winHeight;
var winWidth;
var navCanvasHeight;
var navCanvasWidth;
var navPos = 300;
var bubbleWidth;


var fitViewportToScreenSize = function (){
	
	winHeight = $(window).height() + "px";
    winWidth = $(window).width() + "px";
    $("body").css("height", winHeight);
    $("body").css("width", winWidth);

};

//Make correct canvas positioning based on which page, and size of viewport
var fixNavCanvasSize = function(){
	
    navCanvasHeight = $(window).height() * .80 + "px";
	navCanvasWidth = $(window).width() * .22 + "px";
	$("#navCanvas").attr({
		height: navCanvasHeight,
		width: navCanvasWidth,
    });
	navScene.update();
	
};

var canvasUpForVisibility = function (){
	$("#navCanvasWrapper").css({
		top: "-70px",
		left: "-10px"
	});
	navScene.update();
};

function getWindowHeight(){
	var height = $(window).height();
	return height;
};

function getNavCanvasWidth() {
    navPos = $("#navCanvas").width();	
    return navPos;
};

var bubbleCanvasPos = function(){
	bubbleWidth = $("#myCanvas").attr("width");
};

