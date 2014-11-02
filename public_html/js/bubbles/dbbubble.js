var r;
var centerX;
var centerY;
var index;
var bubbleColors = new Array("#808080","#e9afaf","#aade87","#afdde9","#e5d5ff","#c8b7be","#ffccaa","#afe9c6","#afc6e9","#eeaaff","#917c6f","#ffeeaa","#d7f4d7","#afafe9","#e9afc6","#ffb571","#eeffaa","#d5fff6","#d5d5ff","#ffd5f6","#ffff7b");
//Rainbow color array -> ("#FF4D4D", "#FFA54D", "#FFFF80", "#80FF80", "#8080FF", "#A580C0", "#C780C7");
var textColors = new Array("#333333","#d35f8d","#00aa00","#216778","#bc5fd3","#6c535d","#d38d5f","#536c5d","#2c5aa0","#ab37c8","#2b1100","#d3bc5f","#7c916f","#5d536c","#d35fbc","#c87137","#89a02c","#6f918a","#6f6f91","#d35fbc","#c8ab37");
var initial;
var add;
var currColor = bubbleColors[0];
//working color is used to keep main central bubble and nav node synchronized
var workingColor = currColor;
var currCenter = "Central";
//Used to iterate through array of interests, starting with [0]
var currInterest = 0;

var ajaxData;

var profileWebPopulated = false;

var hasInt = false;   //Use to check if user has interest in their web
var currentIntIds = [];

var bubbleCalc = function(centralNode,init,nav)
{

	if(!nav)
	currLevel++;
	if(!init)
	setNav(centralNode,false);

	var isCached = checkIfCached(centralNode + 'p');
	console.log("Is cached? " + isCached);
	currCNode = centralNode;
	
	
	if (isCached){
		setData(reformDataArray(getNamesByParent(centralNode), centralNode));
		bubbleGeom(ajaxData, false, false); 
		allData[currCNode - 1] = ajaxData; 
	}
	else{
		ajaxRequest(centralNode);
		allData[currCNode - 1] = ajaxData;
	};
		
	bubbleContainer.mouseEnabled = true;	

};

function ajaxRequest(get){
	console.log("ajaxRequest function call...");
	$.ajax('/php/iNodes.php',
		{
			type: 'GET',
			data: {parent:get},
			cache: true,
			success: function (data) {console.log("Ajax request made to iNodes.php"); setData(data); parseData(data); console.log('( ' + data + ' ) stored in local storage.'); bubbleGeom(ajaxData, false, false);},
			error: function () {alert('Central node provided does not exist (BC)');}
	 	});
	 	
};

function setData(data){
	ajaxData = data;
};


var bubbleCalcMe = function(member,centralNode,init,nav)
{
	
	if(!nav)
	    currLevel++;
	if(!init)
	    setNav(centralNode,false);
	    
	    //check if data is cached...  central node?
	    console.log("is it cached? " + checkIfCached(centralNode));
	    
	$.ajax('/php/m_is.php',
	{
		type: 'GET',
		data: {parent:centralNode, member:member,initial:init},   //parent = window memberprofile.php    // member = id of user   
		cache: true,
		init:init,
		success: function (data) {console.log("bubbleCalcMe 'data' : " + data); currCNode = centralNode; var initial=this.init; bubbleGeom(data,true,initial);bubbleContainer.mouseEnabled = true;},
		error: function () {bubbleGeom(null,true,true);}
 	});
 	
};
//Author: Karsten
function hasNoInterests() {          //Called when user has no interests...
	var $box = $("#intWebBox");
	var text = '<div id="noIntMess" name="No Interests" style="top: 100px; border:2px solid black; height:200px; width:300px; color:black; overflow:hidden;"><p style="background-color: lightblue; color:black;">You have no interests yet! Go to the <a href="chooseInterests.php">Choose Interests </a> page to add what you are interested in.</p></div>';
	$box.append(text);
};

var bubbleGeom = function(nodeArr,me,init)
{
	allData = nodeArr;
	//Handle user having no interests
	if (nodeArr == null) {
		console.log('You have no interests defined yet! Visit choose interests to get started.');
		hasNoInterests();
	}
	else {
		if (!$('#noIntMess').name == 'undefined') {
			$('#noIntMess').remove();
		};
	};

	//Make bubbles smaller when there are a lot of nodes, so bubbles don't overlay
	if (nodeArr.length > 7){
		radius -= 8;
	};
	
	initial = init;	

    //If not initialized, number of bubbles is one less than nodeArray length
	if(!init){
	    var num = nodeArr.length-1;
	}    
	else if(nodeArr){
	    var num = nodeArr.length;
	};

    //Clear canvas for new data to be populated
	bubbleContainer.removeAllChildren();
	bubbleContainer.rotation = 0;

    //Set dimensions to start rotating canvas...
	centerX = canvas.width*.5;
	centerY = canvas.height*.5;
	bubbleContainer.x=centerX;
	bubbleContainer.y=centerY;
	guideContainer.x = centerX;
	guideContainer.y = centerY;

    //
	r = radius-centerX+30;
	var ang = (360/num)*(Math.PI/180);
	
	//console.log('num: ' + num);
	if(!me)
	{   
		//"Central"
	    index = 0;
	    createBubble(0,0,nodeArr[index],initial,me, true);
	    
	}
	else if(!initial)
	{
        //First element in array is parent, central bubble
	    index = 0;
	    createBubble(0,0,nodeArr[index],initial,me, true);

	}
	else
	{
		//"ME"
	    index = -1;
	    createBubble(0,0,"Me",initial,me, true);
	};

	var r2 = Math.pow(r,2);
	var a2 = 2*r2*(1-Math.cos(ang));
	var a = Math.sqrt(a2);

	var oang = (90-((180-(360/num))/2))*(Math.PI/180);


	var hor = a*Math.cos(oang);
	var ver = a*Math.sin(oang);

	var mid = Math.ceil(num/2);

	var xpos = 0;
	var ypos = r;

	if(num==1)
	{
		createBubble(xpos,ypos,nodeArr[index],initial,me, false);
	}

	else if(num==2)
	{	
		createBubble(xpos,ypos,nodeArr[index],initial,me, false);
		ypos+= Math.abs(2*r);

		createBubble(xpos,ypos,nodeArr[index],initial,me, false);
	}

	else if(num==3||num==5||num==7)
	{
		createBubble(xpos,ypos,nodeArr[index],initial,me, false);

		xpos+=hor;
		ypos+=ver;

		createBubble(xpos,ypos,nodeArr[index],initial,me, false);
		createBubble(-xpos,ypos,nodeArr[index],initial,me, false);

		if(num==7)
		{
		
			var z = (180-(360/7))/2;
			var b = 90-z;
			var c = 180-(2*b);
			var d = (180-c)*(Math.PI/180);

			var e = ver/Math.sin(d);
			var f = ver/Math.tan(d);
			var j = (2*hor*ver)/e;
			var k = (2*hor*f)/e;

			xpos = k;
			ypos = j+r;

			createBubble(xpos,ypos,nodeArr[index],initial,me, false);
			createBubble(-xpos,ypos,nodeArr[index],initial,me, false);
		}

		if(num==5||num==7)
		{
			xpos=(a/2);
			ypos=a/(2*Math.tan(Math.PI/num));

			createBubble(xpos,ypos,nodeArr[index],initial,me, false);
			createBubble(-xpos,ypos,nodeArr[index],initial,me, false);
		}
	}

	else if(num==4||num==8)
	{
		var i = 1;

		if(num==8)
		{
			var i = 2;
		}

		createBubble(xpos,ypos,nodeArr[index],initial,me, false);

		for(var x=0;x<i;x++)
		{
		if(x==0)
		{	
			xpos+=hor;
			ypos+=ver;
		}
		else
		{
			xpos+=ver;
			ypos+=hor;	
		}	

		createBubble(xpos,ypos,nodeArr[index],initial,me, false);
		}

		for(var x=0;x<i;x++)
		{
		if(x==0)
		{	
			xpos-=ver;
			ypos+=hor;
		}
		else
		{
			xpos-=hor;
			ypos+=ver;
		}
		createBubble(xpos,ypos,nodeArr[index],initial,me, false);
		}

		for(var x=0;x<i;x++)
		{
		if(x==0)
		{
			xpos-=hor;
			ypos-=ver;
		}
		else
		{
			xpos-=ver;
			ypos-=hor;
		}
		createBubble(xpos,ypos,nodeArr[index],initial,me, false);
		}

		if(num==8)
		{
			xpos+=ver;
			ypos-=hor;
			createBubble(xpos,ypos,nodeArr[index],initial,me, false);
		}

	}
	else if(num==6)
	{
		createBubble(xpos,ypos,nodeArr[index],initial,me, false);
		createBubble(xpos,-ypos,nodeArr[index],initial,me, false);

		xpos+=hor;
		ypos+=ver;

		createBubble(xpos,ypos,nodeArr[index],initial,me, false);
		createBubble(-xpos,ypos,nodeArr[index],initial,me, false);
		createBubble(xpos,-ypos,nodeArr[index],initial,me, false);
		createBubble(-xpos,-ypos,nodeArr[index],initial,me, false);
	}
	if (nodeArr.length > 7){
		radius += 8;
	};
	
	var endBranch = checkWhichHaveChildren();
    $('#intList').empty();
    if(endBranch){
	    //add = true;
	}
	else {
		if (whichPage == "chooseInterests.php") {
			removePlus();	
		}
		//add = false;
	};
	
};

//Author: Karsten Rabe

//Iterate through array of colors so each bubble is different.

//return the currColor unless the color array is at the last index; in that case, return to beginning
var getNextColor = function(){
	var color = currColor;
	currInterest += 1;
	if(currInterest > 20){
		currInterest = 0;
	};
	currColor = bubbleColors[currInterest];
	return color;
};


var createBubble = function(x,y,t,init,me, isFirst)
{
	var ibc = new createjs.Container();
	ibc.x = x;
	ibc.y = y;
	ibc.regX = x;
	ibc.regY = y;

    var choice = getNextColor();
	
	var circle = new createjs.Shape();
	var color = choice;

	circle.color = color;
	circle.name = t;
	circle.graphics.beginFill(color).drawCircle(x, y, radius);

	workingColor = color;
  
	circle.shadow = new createjs.Shadow("#80B3FF", 0, 0, 30);

    //Check if the bubble being created is the last node of the branch
	var isFinal = false;

	if(x==0&&y==0)
	{}
	else if(!me){          //Register click to bubbles!
		if (isFinal) {      //bubble is end node of branch, dont register click
			//Don't register click
			console.log("Boom!");
		}
		else {
		    circle.addEventListener("click", function(event){bubbleContainer.mouseEnabled = false; currColor = event.target.color; currCenter = event.target.name; bubbleCalc(t[0],false,false);});
		};
    }
	else if(!init){
		circle.addEventListener("click",function(event){bubbleContainer.mouseEnabled = false; currColor = event.target.color; currCenter = event.target.name; bubbleCalcMe(t[0],t[1],false,false);});
	}
	else{
		alert("Problem...");
	};
	
	if(add) {  
		//console.log('addToMe: t[0]' + t[0] + ' | Fired editI nterests()');
		//editInterests(t[0]);
	}
	else if (!add) {
		if (whichPage == "chooseInterests.php"){
			//removePlus();
		};
	};

	ibc.addChild(circle);
	
	//This branch for chooseInterests page
	if(!me)
	{
		if(isFirst){
    		adjustFontSize(ibc,x,y,t[1],choice, workingColor, isFirst);
		}
		else{
			adjustFontSize(ibc,x,y,t[1],choice,currColor,false);
		}
	}    
	//This branch for non-central memberProfile bubbles
	else if(!init)
	{
		var isCached = checkIfCached(t[1]);
		if (isCached) {
			var name = getNameById(t[1]);
			console.log('fetched from cache: ' + name);
			adjustFontSize(ibc,x,y,name,choice, color, isFirst);
		}
		else {
			$.ajax('/php/iNodes.php',
			{
				type: 'GET',
				data: {id:t[1]},
				cache: true,
				success: function (data) {storeIdName(data.id, data.name); console.log('data id: ' + data.id + ' & ' + 'data name: ' + data.name + ' cached.'); adjustFontSize(ibc,x,y,data.name,choice, color, isFirst);},
				error: function () {alert('Central node provided does not exist.');}
	 		});
	 	};	
	}
	else
	//This branch for central node on memberProfile page
	{
	    adjustFontSize(ibc,x,y,t,choice, workingColor, isFirst);
	    initial = false;
	};
	
	bubbleContainer.addChild(ibc);
	index++;
};

var adjustFontSize = function(ibContainer,x,y,tex,colorChoice, bubbleColor, isFirst) {
	
	var t = new createjs.Text(tex, "25px segoe", textColors[colorChoice]);
 	t.x = x;
 	t.y = y;
 	t.textAlign = "center";
 	t.textBaseline = "alphabetic";
 	t.maxWidth = (2*radius)-10;

 	var fontSize = t.font.substring(0,2);
 	fontSize = parseInt(fontSize);
 	var linewidth = 2*radius;

 	ibContainer.addChild(t);
 	if (isFirst){
 		t = t.toString();
 		t = t.substring(12, t.length-2);
 	    updateNavColorAndText(bubbleColor, t, currLevel+1);
        
 	    //imgConfig();                              //UNCOMMENT WHEN DB STUFF DONE...
 	}
};

//Author: Karsten
function addInterestNamesToEditPopup(name, has) {               //add current interest node to editInt popup
	
	var hasInterest;
	var string = JSON.stringify(name);
	var index = string.indexOf(',"') + 2;
	string = string.substring(index, string.length);
	index = string.indexOf('",');
	string = string.substring(0, index);
	this.hasInterest = has;
	var $div = $("#intList");
	var img = '<img src="assets/plusButton.png" title="Add interest" class="first" height="50px" width="50px" />';
	var img2 = '<img src="assets/minusButton.png" title="Remove interest" class="rot" height="50px" width="50px" />';
	var pre = '<div class="nameContainer'; 
	var Class = ' has';
	var cap = '">';
	var mid = '<div style="border: none; background-color:rgba(0,0,0,0);" class="intName';
    var post = '</div></div>';
	if (!hasInterest) {
		this.intNode = pre + Class + cap + img2 + mid + cap + string + post;
	}
	else if (hasInterest) {
		this.intNode = pre + cap + img + mid + cap + string + post;
	}
	else {
		alert("Error!");
	};
	
    $div.prepend(intNode);
};

//Author: Karsten
function checkIfUserHasInterest(interest) {                //Find out if interest is in users database...  jquery AJAX method
	
	var member = $('#user').html();
	var iid = JSON.stringify(interest);
	var index = iid.indexOf(',');
	iid = iid.substring(3, index-1);
	var mid = parseInt(member);
	$.ajax('/php/m_is.php',
		{
			type: 'GET',
			data: {mid:mid,iid:iid,inTree:true},      //This request iid only wants the interest id.
			cache: false,
			success: function (data) {addInterestNamesToEditPopup(interest, data);},      //addInterestNames needs the full node; ie, id, name, parent. 
			error: function () {console.log("Error checking if interest is in user's database...");}
 		});
};

function checkWhichHaveChildren() {             //Check which interests currently being displayed have children

    var someOrNone = false;
    var isFinished;
    
    interest = currentIntIds[0];
    for (var i=0; i<currentIntIds.length; i++){
    	if(!currentIntIds[i] == ""){
    		//check if cached...
    		var stuff = getNamesByParent(currentIntIds[i]);
    		console.log("Stuff: " + stuff);
    		if (1 == 2) {
    			//There are child nodes cached already
    			check(stuff);
    		}
    		else {       //not cached so make request
    			ajax(currentIntIds[i]);
    		};
    	};
    	if(i == currentIntIds.length -1) {
    		isFinished = true;
    	};	
    };
    	
    function ajax(id) {
    	$.ajax('/php/iNodes.php',
			{
				type: 'GET',
				data: {parent:id},
				async: false,
				success: function (data) {check(data); console.log("Checking " + id + " . . .");},
				error: function () {console.log("Request failed with interest " + id);}
			});
    };	
    	
	function check(data) {
		if (data.length == 1) {
			someOrNone = true;
			editInterests(data);
			checkIfUserHasInterest(data);
			console.log("Data: " + data);
		}
		else {
			//Nothing
		};
	};
	
	if (isFinished) {
		return someOrNone;
	}
};

//var iid = id number of chosen interest          //NO LONGER NEEDED
var addToMe = function(iid)
{
	picture=new Image();
    picture.src="/assets/add.png";
    bm=new createjs.Bitmap(picture);
    bm.x=canvas.width-62;
    bm.y=canvas.height-53;
    bm.addEventListener("click",function(){finishAdding(iid);});
    scene.addChild(bm);
};

//Function author: Karsten                          Delete interest from users web
var delFromDB = function(iid){
	var interest = iid;
	var userID = $('#user').html();
	$.ajax('/php/m_is.php',
	{
		type: 'POST',
		data: {mid:userID,iid:interest,remove:true},
		success: function (data) {console.log('Removed interest ' + interest + ' from your web.');},
		error: function () {console.log('Error removing interest from your web.');}
	});
};

//Var iid = id number of chosen interest
var finishAdding = function(iid)
{
	var iid=iid;
	var member = $('#user').html();
	member = parseInt(member);
	$.ajax('/php/m_is.php',
		{
			type: 'POST',
			data: {mid:member,iid:iid},
			success: function (data) {alert('Successfully added interest ' + iid + " to member " + member);},
			error: function () {alert("Error adding interest " + iid + " to member " + member + '. But check your web anyway, it probably worked.');}
 		});
};

 

