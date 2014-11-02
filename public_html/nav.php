	<div class='container'>
	<nav class='navbar navbar-default navbar-fixed-top' role='navigation'>
	    <div class='container-fluid'>
	      <!-- Brand and toggle get grouped for better mobile display -->
	      <div class='navbar-header'>
		<button type='button' class='navbar-toggle' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'>
		  <span class='sr-only'>Toggle navigation</span>
		  <span><img src='assets/toggle_down.png' height='15px'</span>
		</button>
		<a class='navbar-brand' href='memberprofile.php'><img src='assets/brand.png' height='60px' /></a>
	      </div>
		
	      <!-- Collect the nav links, forms, and other content for toggling -->
	      <div class='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
		<ul class='nav navbar-nav'>
		  <li><a href='calendar/events.php'>Events</a></li>
		  <li><a href='neighbors.php'>Neighbors</a></li>
		  <li><a href='community.php'>Community</a></li>
		  <li>
		    <div id="bulletinBox">
		  		<div id="topBox">
			    	<p id="appendTarget"style="color:white;">Bulletin Board <img src="../assets/right_arrow.png" height="12px" width="12px"></p>
			    </div>	
			    <div id="bottomBox">
			        <p id="firstOne"><a href="../feed/bulletin.php">&nbsp;Updates</a></p>
			        <p id="secondOne"><a href="../feed/bulletin.php">Promotions</a></p>
			        <p id="thirdOne"><a href="../feed/bulletin.php">Events</a></p>
			    </div>
		    </div>
		    
		  </li>
		  <li>
		  	<button onclick="logLocal()">Click here</button>
<script>
	function logLocal() {
		console.log(" *Currently cached keys: ");
		for (var key in localStorage) {
			console.log(key);
		};
		clear();
	};
	function clear() {
		localStorage.clear();
		console.log(" *Local Storage cleared");
	}
</script>
		  	<p style="display:inline;">
	  			to clear your local storage.
		  	</p>
		  	<p>
		  		(Your interests will be refetched and re-cached)
		  	</p>
		  </li>
		  <li>
		  	<div id="sure">
		    	<button id="clearInterest" onclick="clearAllInts()">Click here</button>
		    	<p style="display: inline;"> 
		    		to clear your interests. 
	    		</p>
	    		<p>
	    			WARNING! cannot be undone.
	    		</p>
	    		
		    </div>
		  </li>
		</ul>
		<p class='navbar-text navbar-right hidden-sm hidden-xs'>explore your community</p>
	      </div><!-- /.navbar-collapse -->
	    </div><!-- /.container-fluid -->
	</nav>
	
	<div class='row'>
	    
	    <!--Absolute Position on Md/Lg Screen-->
	    <div id='absolute' class='hidden-xs'>
		<div class='col-xs=2'>
		    <img src='assets/toggle_empty.png' height='30px'/>
		</div>
		<div class='col-xs-10'>
		    <div id='sideNav side-Navigation' class='sNav'>
			<div id='sNav-inner'>
			<p id='name' class='pushover'><?php echo $_SESSION["fb_name"]; ?></p>
			<img id='profpic' class='spaceUnder pushover' src='https://graph.facebook.com/<?php echo $_SESSION["fb_id"]; ?>/picture?height=350&width=350'>
			<ul class='po'>
			    <li class='spaceUnder'><a href='memberprofile.php'>Home</a></li>
			    <li class='spaceUnder'><a href='messages.php'>Messages</a></li>
			    <li class='spaceUnder'><a href='settings.php'>Settings</a></li>
			    <li class='spaceUnder'><a href='chooseInterests.php'>Choose Interests</a></li>
			    <li class='spaceUnder'><a href='<?php echo $logoutUrl?>'>Logout</a></li>
			</ul>
		    </div>
		    </div>
		</div>
	    </div><!-- end toggleSide -->
	    
	    <!--Toggle Nav on Sm/Xs Screen-->
	    <div id='toggleSide' class='hidden-sm hidden-md hidden-lg'>
		<div class='col-xs=2'>
		    <img src='assets/toggle_right.png' height='30px'/>
		</div>
		<div class='col-xs-10'>
		    <div id='sideNav side-Navigation' class='sNav'>
			<div id='sNav-inner'>
			<p id='name' class='pushover'><?php echo $_SESSION["fb_name"]; ?></p>
			<img id='profpic' class='spaceUnder pushover' src='https://graph.facebook.com/<?php echo $_SESSION["fb_id"]; ?>/picture?height=350&width=350'>
			<ul class='po'>
			    <li class='spaceUnder'><a href='memberprofile.php'>Home</a></li>
			    <li class='spaceUnder'><a href='messages.php'>Messages</a></li>
			    <li class='spaceUnder'><a href='settings.php'>Settings</a></li>
			    <li class='spaceUnder'><a href='chooseInterests.php'>Choose Interests</a></li>
			    <li class='spaceUnder'><a href='<?php echo $logoutUrl; ?>'>Logout</a></li>
			</ul>
		    </div>
		    </div>
		</div>
	    </div><!-- end toggleSide -->