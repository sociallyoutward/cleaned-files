var canvas;
var scene;
var nav = document.getElementById("navCanvas");
var navScene = new createjs.Stage(nav);
var navSkeleton;
var navBubble1, navBubble2, navBubble3, navBubble4, navBubble5;
var color;
var bubbleContainer;
var moon1;
var speed = .5;
var currBubbles = 6;
var iGuide = false;
var cGuide = false;
var oGuide = false;
var radius;
var currText = "Socially Outward";
var currCNode = 1;
var currLevel = 0;

//spacing for navigation so all visible on profile page compactness
var navSpacing = 95;

var navCircles;
var navColors = new Array;
var member;
var tester = 0;
var whichPage = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);
var allData = new Array;
var userData;

function init(){
	allData = [];
	//bubble web
	canvas = document.getElementById("myCanvas");
	scene = new createjs.Stage(canvas);
	//nav Web
	nav = document.getElementById("navCanvas");
    navScene = new createjs.Stage(nav);
	navSkeleton = new createjs.Container();
	navBubble1 = new createjs.Container();
	navBubble2 = new createjs.Container();
	navBubble3 = new createjs.Container();
	navBubble4 = new createjs.Container();
	navBubble5 = new createjs.Container();
	navScene.addChild(navSkeleton, navBubble1, navBubble2, navBubble3, navBubble4, navBubble5);
	member = $('#user').html();
	member = parseInt(member);
	initNav();
	radius = canvas.height*.13;
	bubbleContainer = new createjs.Container();
	scene.addChild(bubbleContainer);
	guideContainer = new createjs.Container();
	scene.addChild(guideContainer);
	createjs.Ticker.useRAF=true;
	createjs.Ticker.setFPS(40);
	createjs.Ticker.addListener(window);
	createjs.Ticker.addEventListener("tick", ticktate);
	
	if(whichPage=="chooseInterests.php")
	{
		bubbleCalc(1,true,true);
	}

	else if(whichPage=="memberprofile.php")
	{
		bubbleCalcMe(member,1,true,true);
	}
};

var initNav = function()
{
	//Bunch nav together on profile page
	if (whichPage == "memberprofile.php"){
		navSpacing = 90;
	};
	
	var nav1 = new createjs.Shape();
	nav1.navIndex = 0;
	nav1.yCoord = 77;
	nav1.xCoord = 300;
	nav1.graphics.setStrokeStyle(3);
	nav1.graphics.beginStroke("black").drawCircle(nav1.xCoord, nav1.yCoord, 25);
	nav1.graphics.beginFill("white").drawCircle(nav1.xCoord, nav1.yCoord, 25);
	
	
	var nav2 = new createjs.Shape();
	nav2.navIndex = 1;
	nav2.yCoord = navSpacing + 102;
	nav2.graphics.setStrokeStyle(3);
	nav2.graphics.beginStroke("black").drawCircle(nav1.xCoord, nav2.yCoord, 25);
	nav2.graphics.beginFill("white").drawCircle(nav1.xCoord, nav2.yCoord, 25);
	
	var nav3 = new createjs.Shape();
	nav3.navIndex = 2;
	nav3.yCoord = 2 * navSpacing + 127;
	nav3.graphics.setStrokeStyle(3);
	nav3.graphics.beginStroke("black").drawCircle(nav1.xCoord, nav3.yCoord, 25);
	nav3.graphics.beginFill("white").drawCircle(nav1.xCoord, nav3.yCoord, 25);
	
	var nav4 = new createjs.Shape();
	nav4.navIndex = 3;
	nav4.yCoord = 3 * navSpacing + 152;
	nav4.graphics.setStrokeStyle(3);
	nav4.graphics.beginStroke("black").drawCircle(nav1.xCoord, nav4.yCoord, 25);
	nav4.graphics.beginFill("white").drawCircle(nav1.xCoord, nav4.yCoord, 25);
	
	var nav5 = new createjs.Shape();
	nav5.navIndex = 4;
	nav5.yCoord = 4 * navSpacing + 177;
	nav5.graphics.setStrokeStyle(3);
	nav5.graphics.beginStroke("black").drawCircle(nav1.xCoord, nav5.yCoord, 25);
	nav5.graphics.beginFill("white").drawCircle(nav1.xCoord, nav5.yCoord, 25);
	
	var lines = new createjs.Shape();
	lines.graphics.setStrokeStyle(3);
	lines.graphics.moveTo(nav1.xCoord, navSpacing - 28);
	lines.graphics.beginStroke("black");
	lines.graphics.lineTo(nav1.xCoord, (navSpacing * 5 + 75));
	
	navSkeleton.addChild(lines, nav1, nav2, nav3, nav4, nav5);
	
	navScene.update();
	navCircles= [nav1, nav2, nav3, nav4, nav5];


};

var setNav = function(interestID)
{

	if(currLevel>(-1))
	{
	$.ajax('/php/iNodes.php',
		{
			type: 'GET',
			data: {child:interestID},
			cache: true,
			success: function (data) {setNavFinish(data);},  // console.log("setNav 'data' (parent ID) : " + data);},
			error: function () {alert('setNav() Problem');}
 		});
	};

	navScene.update();
	//Upon click above, clear below circles and set current level appropriately according to the index of the circle pressed
};

//Author:Karsten Rabe
//pass color of bubble, name, and which node in tree: updates side nav to match center web.
var updateNavColorAndText = function(color,  nodeName, whichNode){

	var circle = new createjs.Shape();
	var yAxis = 0;
	
	//Where in tree? Set Y axis num pixels down based on which one.
	if (whichNode == 2){       //1st child
		yAxis = navSpacing + 25;
	}
	else if (whichNode == 3){  //grand-child
		yAxis = 2 * navSpacing + 50;
	}
	else if (whichNode == 4){      //great grand-child
		yAxis = 3 * navSpacing + 75;
	}
	else if (whichNode == 5){      //great-great grand-child
		yAxis = 4 * navSpacing + 100;
	};
	
	circle.graphics.beginFill(color).drawCircle(300, 77 + yAxis, 25);
	var text = new createjs.Text(nodeName, "20px segoe", "black");
	text.x = 300 - text.getMeasuredWidth();
	//"Me" overlaps bubble otherwise...
	if (text.x > 200){
		text.x -= 55;
	}
	else if (text.x < 120){
		text.x += 60;
	}
	else if (text.x < 60){
		text.x += 30;
	}
	text.y = yAxis + 47;
	text.regX = text.getMeasuredWidth() / 2;
	text.regY = text.getMeasuredLineHeight() / 2;
	text.rotation = 30;
	
	circle.ID = whichNode;
	text.ID = whichNode;
	
	if (whichNode == 1){
		navBubble1.addChild(circle, text);
	}
	else if (whichNode == 2){
		navBubble2.addChild(circle, text);
	}
	else if (whichNode == 3){
		navBubble3.addChild(circle, text);
	}
	else if (whichNode == 4){
		navBubble4.addChild(circle, text);
	}
	else {
		navBubble5.addChild(circle, text);
	};
	
	navScene.addChild(navBubble1, navBubble2, navBubble3, navBubble4, navBubble5);
	navColors[whichNode] = circle;
	navScene.update();
	
};


var setNavFinish = function(parentID)
{	
	var c;

	if(currLevel==1)
	{
		c = true;
	}
	else
	{
		c = false;
	}
	if(whichPage=="chooseInterests.php")
	{
	    navCircles[currLevel-1].removeAllEventListeners("click");
	    navCircles[currLevel-1].addEventListener("click",function(event){navClickHandler(event); bubbleCalc(parentID,c,true);});
	}
	else if(whichPage=="memberprofile.php")
	{
		navCircles[currLevel-1].removeAllEventListeners("click");
		navCircles[currLevel-1].addEventListener("click",function(event){navClickHandler(event); bubbleCalcMe(member,parentID,c,true);});
	}
	else
	{
		alert("Error: wrong page: " + whichPage);
	}
	
};


var navClickHandler = function(event)
{

	if(event.target.navIndex < currLevel)
	{
		currLevel = event.target.navIndex;
		for (var i = currLevel+1; i < 6; i++){
            //Remove all with navIndex greater than event target...

            if (i == 5){
            	navBubble5.removeAllChildren();
            };
            if (i == 4){
            	navBubble4.removeAllChildren();
            };
            if (i == 3){
            	navBubble3.removeAllChildren();
            };
            if (i == 2){
            	navBubble2.removeAllChildren();
            };
            if (i == 1){
            	navBubble1.removeAllChildren();
            };

		}
		for(var i = currLevel;i<navCircles.length;i++)
		{
			if(navCircles[i].hasEventListener("click"))
			{
				navCircles[i].removeAllEventListeners("click");
			};
			if(i!=currLevel)
			{
			  navCircles[i].graphics.beginFill("white").drawCircle(300,navCircles[i].yCoord,25);
			  			  
			  navScene.update();
			};
		};
	};
	
};

var ticktate = function()
{
	
	for(var x=0;x<bubbleContainer.getNumChildren();x++)
	{	
	bubbleContainer.getChildAt(x).rotation-= speed;
	}
	bubbleContainer.rotation+= speed;
	scene.update();
};

window.onload=init;

