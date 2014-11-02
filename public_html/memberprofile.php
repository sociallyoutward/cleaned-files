<?php
require 'permissionChecks.php';
require 'getLogout.php';
?>
<html>
<head>
    <title>My Profile</title> <!-- ADD TITLE -->
    
    <?php readfile('linkedfiles.php') ?> <!-- STANDARD LINKED FILES HERE -->
    
    
    <!-- LINKED FILES FOR THIS PAGE START -->
    <script src='http://code.createjs.com/createjs-2013.12.12.min.js'></script>
    <script src='http://code.createjs.com/createjs-2013.02.12.min.js'></script>
    
    <script src='js/bubbles/dbinitialize2.js'></script>
    <script src='js/bubbles/resize.js'></script>
    <script src='js/bubbles/dbbubble.js'></script>
    <script type="text/javascript" src="js/ajaxCacher.js"></script>
    <script src='js/clearInterests.js'></script>
    <!-- LINKED FILES FOR THIS PAGE END -->
    
</head>
<?php
// flush the buffer
flush();
?>
<body>

	
	<?php include 'nav.php' ?> <!-- NAV HERE -->
	    
	    <!-- THIS PAGE CONTENT START HERE -->
	    <div id='content' class='row'>
		<div id="bl-main" class="bl-main">
		    <section>
			<div class="bl-box">
			    <h2 class="bl-icon bl-icon-about">Interest Web</h2>
			    <img src="assets/web-icon.png">
			</div>
			<div class="bl-content" >
			    <h2 id="intWebBox">Interest Web</h2>
			    <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
				<div id='can'>
				    <canvas width='460px' height='500px' id='myCanvas'></canvas>
				</div>
			    </div>
			    <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
				    <div id="navCanvasWrapper" style="position:absolute; top:0px;">
				    	<canvas width='230px' height='580px' id='navCanvas'></canvas>
				    </div>  
			    </div>
			</div>
			<span class="bl-icon bl-icon-close"><img src="assets/closeWindow.png" /></span>
		    </section>
		    <section id="bl-work-section">
			<div class="bl-box">
			    <h2 class="bl-icon bl-icon-works">Socially Outward Status</h2>
			    <img src="assets/vs-icon.png">
			</div>
			<div class="bl-content">
			    <h2>Socially Outward Status</h2>
			    <div id="vs">VS.</div>
			    <div class="SO-user">
				<p><?php echo $_SESSION['fb_name']; ?>
				<br><img src='https://graph.facebook.com/<?php echo $_SESSION["fb_id"]; ?>/picture?height=117&width=117'></p>
			    </div>
			    <div class="SO-choose">
				community or friend
			    </div>
			<span class="bl-icon bl-icon-close"><img src="assets/closeWindow.png" /></span>
		    </section>
		    <section>
			<div class="bl-box">
			    <h2 class="bl-icon bl-icon-blog">Recent Activity</h2>
			    <img src="assets/feed-icon.png">
			</div>
			<div class="bl-content overflow-scroll">
			    <div class="row">
				<div class="col-md-9">
				    <h2>What's the 411 in Chapel Hill?</h2>
				    <div class="activityBox">
					<div class="activityIcon"><img src="assets/event-small.png" style="width: 50px;" /> </div>
					<div class="activityFeed">
					    <p>What
					    <br>Who
					    <br>When</p>
					</div>
				    </div>
				    <div class="activityBox">
					<div class="activityIcon">picture</div>
					<div class="activityFeed">
					    <p>What
					    <br>Who
					    <br>When</p>
					</div>
				    </div>
				    <div class="activityBox">
					<div class="activityIcon">picture</div>
					<div class="activityFeed">
					    <p>What
					    <br>Who
					    <br>When</p>
					</div>
				    </div>
				    <div class="activityBox">
					<div class="activityIcon">picture</div>
					<div class="activityFeed">
					    <p>What
					    <br>Who
					    <br>When</p>
					</div>
				    </div>
				    <div class="activityBox">
					<div class="activityIcon">picture</div>
					<div class="activityFeed">
					    <p>What
					    <br>Who
					    <br>When</p>
					</div>
				    </div>
				</div>
				<div class="col-md-3">
				    <div class="activity-sidebar">
					<button class="btn">web</button>
					<button class="btn">event</button>
					<button class="btn">message</button>
				    </div>
				</div>
			    </div>
			    
			</div>
			<span class="bl-icon bl-icon-close"><img src="assets/closeWindow.png" /></span>
		    </section>
		    <section>
			<div class="bl-box">
			    <h2 class="bl-icon bl-icon-contact">What's Hot Nearby</h2>
			    <img src="assets/explore-icon.png">
			</div>
			<div class="bl-content">
			    <h2>What's Hot Nearby</h2>
			    <hr>
			    <h3><b>Promotion 1</b></h3>
			    <p>Promotion from business feed</p>
			    <hr>
			    <h3><b>Activity 1</b></h3>
			    <p>Local activity</p>
			    <hr>
			    <h3><b>Activity 2</b></h3>
			    <p>Local activity</p>
			</div>
			<span class="bl-icon bl-icon-close"><img src="assets/closeWindow.png" /></span>
		    </section>
		</div>
	    </div> <!-- end #content -->

	    <!-- THIS PAGE CONTENT END HERE -->
	    
	    <div id='user' hidden='false'><?php  print_r($_COOKIE['user']); ?></div>
	    
	<!-- FOR CLOSING OFF NAVIGATION -->
	</div><!-- end .row -->
    </div><!-- end .container-->
    <!-- END CLOSING OFF NAVIGATION -->

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="js/boxTransition.js"></script>
    <script>
	$(function() {
	    Boxlayout.init();
	});
    </script>
</body>
</html>