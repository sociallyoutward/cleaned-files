<?php
if(!isset($_COOKIE['user']))
{
    header('location: index.php');
}

require '../fbconfig.php';
?>
<html>
<head>
	<title>Event Calendar</title>

    <!-- Bootstrap 3.1.1. Latest compiled and minified CSS -->
    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
    
    <!-- JQuery -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    
    <!-- Bootstrap 3.1.1 Latest compiled and minified JavaScript -->
    <script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
    
    <!-- Favicon -->
    <link rel="icon" href="../assets/logo.png">
    
    <script src=" http://code.createjs.com/createjs-2013.02.12.min.js"></script>
    <script type="text/javascript" src='js/showMenu.js'></script>
    <script src="http://code.createjs.com/createjs-2013.02.12.min.js"></script>
    <script src="../js/clearInterests.js"></script>
    <script src="../js/sideMenu.js"></script>
    <script type="text/javascript" src="../js/slideBulletinMenu.js"></script>
    
	<link rel="stylesheet" href="components/bootstrap3/css/bootstrap.css">
	<link rel="stylesheet" href="css/calendar.css">
	<link rel="stylesheet" href="css/calendarStyles.css">
    
    <!-- Socially Outward Styles -->
    <link href="../css/memberProfile.css" type="text/css" rel="stylesheet">
    <link href="../css/navigationTemplate.css" type="text/css" rel="stylesheet">
    <link href="../css/styles.css" type="text/css" rel="stylesheet">
    <link href="../css/buttonSidebar.css" type="text/css" rel="stylesheet">
   <link type="text/css" href="../css/bulletinBoxStyle.css" rel="stylesheet" />

   <!-- jQuery UI/Timepicker Addon -->
   <script src="//code.jquery.com/ui/1.11.1/jquery-ui.js"></script>
   <script src="js/timepicker.js"></script>
   <script src="js/eventSubmit.js"></script>
   <link href=" https://code.jquery.com/ui/1.11.1/themes/black-tie/jquery-ui.css" type="text/css" rel="stylesheet">
   <link href="css/timepicker.css" type="text/css" rel="stylesheet">

	<style type="text/css">
		.btn-twitter {
			padding-left: 30px;
			background: rgba(0, 0, 0, 0) url(https://platform.twitter.com/widgets/images/btn.27237bab4db188ca749164efd38861b0.png) -20px 9px no-repeat;
		}
		.btn-twitter:hover {
			background-position:  -21px -16px;
		}
	</style>
	<script src="ajax-form.js"></script>
	
	<!--Size document to browser viewport-->
    <script src="js/windowDimensions.js" type="text/javascript"></script>
	
</head>
<body>
<div hidden="true" id="userid"><?php echo $_COOKIE['user'];?></div>
<div class="container">
	<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
	    <div class="container-fluid">
	      <!-- Brand and toggle get grouped for better mobile display -->
	      <div class="navbar-header">
		<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		  <span class="sr-only">Toggle navigation</span>
		  <span><img src="../assets/toggle_down.png" height="15px"</span>
		</button>
		<a class="navbar-brand" href="../memberprofile.php"><img src="../assets/brand.png" height="60px" /></a>
	      </div>
		
	       <!-- Collect the nav links, forms, and other content for toggling -->
	      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		<ul class="nav navbar-nav">
		  <li><a href="../calendar/events.php">Events</a></li>
		  <li><a href="../neighbors.php">Neighbors</a></li>
		  <li><a href="../community.php">Community</a></li>
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
		</ul>
		<p class="navbar-text navbar-right hidden-sm hidden-xs">explore your community</p>
	      </div><!-- /.navbar-collapse -->
	    </div><!-- /.container-fluid -->
	</nav>
	
	<div class="row">
	    <div id="toggleSide">
		<div class="col-xs=2">
		    <img src="../assets/toggle_right.png" height="30px"/>
		</div>
		<div class="col-xs-10">
		    <div id="sideNav side-Navigation" class="sNav">
			<div id='sNav-inner'>
			<a href='../memberprofile.php'><p id='name' class='pushover'><?php echo $fbfullname; ?></p></a>
			<a href='../memberprofile.php'><img id='profpic' class='spaceUnder pushover' src="https://graph.facebook.com/<?php echo $user; ?>/picture?height=350&width=350"></a>
			<ul class='po'>
			    <li class='spaceUnder'><a href='../memberprofile.php'>Home</a></li>
			    <li class='spaceUnder'><a href='#'>Messages</a></li>
			    <li class='spaceUnder'><a href='#'>Settings</a></li>
			    <li class='spaceUnder'><a href='../chooseInterests.php'>Choose Interests</a></li>
			    <li class='spaceUnder'><a href="<?php echo $logoutUrl; ?>">Logout</a></li>
			</ul>
		    </div>
		    </div>
		</div>
	    </div><!-- end toggleSide -->
	    
	    <!-- Begin calendar -->
	    <div id='content' class="row">
		<div class="col-md-9">
			<!-- Name of Month -->
			<div class="page-header"><h3></h3></div>

			<div id="calendar"></div>
		</div>
		<div class="col-md-3">
			<div class="button-sidebar form-inline">
				<!--Submission Form to Create Event -->
				
				<!-- Button to trigger modal -->
				<button class="btn" data-toggle="modal" data-target="#myModal">
				  Create an Event
				</button>
				
				<!-- Modal -->
				<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				  <div class="modal-dialog">
				    <div class="modal-content">
				      <div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h4 class="modal-title" id="myModalLabel">Create an Event</h4>
				      </div>
				      
				      <div class="modal-body">
					<!-- Submission Form -->
					<form role="form">
						<div class="form-group">
							<label>Name</label>
							<input id="eventName" type="text" class="form-control" placeholder="Name">
						</div>
					</form>
					<form class="form-inline" role="form">
						<div class="form-group">
							<label>Start</label>
							<input id="startDate" type="datetime" class="form-control" placeholder="Start Date">
						</div>
						<div class="form-group">
							<label>End</label>
							<input id="endDate" type="datetime" class="form-control" placeholder="End Date">
						</div>
						<div class="form-group">
							<label>Type</label>
							<select class="form-control" id="pubpriv">
							<option>Public</option>
							<option>Private</option>
						      </select>
						</div>
					</form>
					<br>
					<form>
						<div class="form-group">
							<label>Description</label>
							<textarea type="text" class="form-control" rows="3" id="description"></textarea>
						</div>
						<div class="form-group">
							<label for="exampleInputPassword1">Interest</label>
							<select class="form-control" id="interest">
							<option>Entertainment</option>
							<option>Sports</option>
							<option>Recreational Activities</option>
							<option>Food &amp; Beverage</option>
							<option>Arts, Crafts, &amp; Hobbies</option>
							<option>Seasonal</option>
						      </select>
						</div>
					</form>
				      </div><!-- end .modal-body -->
				      
				      <div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button id="submitEvent" type="button" class="btn btn-primary" data-calendar-nav="today">Submit Event</button>
				      </div>
				    </div>
				  </div>
				</div> <!-- end create event modal -->
				
				<hr>
				<div class="btn-group">
					<button class="btn" data-calendar-nav="prev"><< Prev</button>
					<button class="btn active" data-calendar-nav="today">Today</button>
					<button class="btn" data-calendar-nav="next">Next >></button>
				</div>
				<hr>
				<div class="btn-group">
					<button class="btn active" data-calendar-view="month">Month</button>
					<button class="btn" data-calendar-view="week">Week</button>
					<button class="btn" data-calendar-view="refresh" id="refreshCal">Refresh</button>
					<button class="btn" id="deleteEvents">Delete All Events</button>
				</div>
			</div>
		</div>
		
	
		<div class="clearfix"></div>
		
		<div class="modal fade" id="events-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<h4 class="modal-title">Event</h4>
					</div>
					<div class="modal-body" style="height: 400px">
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
	    <!-- Bootstrap Calendar Scripts -->
		<script type="text/javascript" src="components/underscore/underscore-min.js"></script>
		<script type="text/javascript" src="components/bootstrap3/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="components/jstimezonedetect/jstz.min.js"></script>
		<script type="text/javascript" src="js/language/nl-NL.js"></script>
		<script type="text/javascript" src="js/language/fr-FR.js"></script>
		<script type="text/javascript" src="js/language/de-DE.js"></script>
		<script type="text/javascript" src="js/language/el-GR.js"></script>
		<script type="text/javascript" src="js/language/it-IT.js"></script>
		<script type="text/javascript" src="js/language/pl-PL.js"></script>
		<script type="text/javascript" src="js/language/pt-BR.js"></script>
		<script type="text/javascript" src="js/language/es-MX.js"></script>
		<script type="text/javascript" src="js/language/es-ES.js"></script>
		<script type="text/javascript" src="js/language/ru-RU.js"></script>
		<script type="text/javascript" src="js/language/sv-SE.js"></script>
		<script type="text/javascript" src="js/language/cs-CZ.js"></script>
		<script type="text/javascript" src="js/yyyymmdd.js"></script>
		<script type="text/javascript" src="js/calendar.js"></script>
		<script type="text/javascript" src="js/app.js"></script>
	
		<script type="text/javascript">
			var disqus_shortname = 'bootstrapcalendar'; // required: replace example with your forum shortname
			(function() {
				var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
				dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
				(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
			})();
		</script>
		
	    </div> <!-- end content -->
		
	</div> <!-- end .container -->

</body>
</html>
