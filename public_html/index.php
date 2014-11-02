<?php
require 'fbconfigNew.php';   // Include fbconfig.php file
if(isset($_COOKIE['user']))
{
    header('location: memberprofile.php');
}
?>

<html xmlns:fb="http://www.facebook.com/2008/fbml">
<head>
    <title>SociallyOutward</title>
    
    <!--Favicon-->
    <link rel="icon" href="assets/logo.png">
    
    <!-- Bootstrap 3.1.1. Latest compiled and minified CSS -->
    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
    
    <!-- JQuery -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    
    <!-- Bootstrap 3.1.1 Latest compiled and minified JavaScript -->
    <script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
    
    <!-- Socially Outward Styles -->
    <link href="css/memberProfile.css" type="text/css" rel="stylesheet">
    <link href="css/navigationTemplate.css" type="text/css" rel="stylesheet">
    <link href="css/styles.css" type="text/css" rel="stylesheet">
    <link href="css/index2.css" type="text/css" rel="stylesheet">

    <script src=" http://code.createjs.com/createjs-2013.02.12.min.js"></script>
    <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
    <script src="js/login.js"></script>
    <script src="js/bottombar.js"></script>
    
    <!--Size document to browser viewport-->
    <script src="js/windowDimensions.js" type="text/javascript"></script>
</head>

<body>
    <div class="header row">
	<a href="memberprofile.php"><img src="assets/brand.png" height="90px" /></a>
    </div>

    <form id='login_form'>
	
	<div id='lText'>
	    <input type="text" placeholder="username" id="username" class="lInput"></input>
	    <input type="password" placeholder="password" id="password" class="lInput"></input>
	</div>
	<div id="lOther">
	    <span id="kmli"><input type="checkbox" id='stayLoggedIn'> Keep me logged in</input></span>
	    <a href="" id="fp">Forgot password?</a>
	</div>
	<div id="unplug">
	    <input type="submit" value="unplug" id="up" class="subbutton"></input>
	    <a href='newmember.php'><input type="button" value="create new account" id="up" class="subbutton"></input></a>
	</div>
	
	<div class="centerButton"></div><a href="<?php echo $loginUrl; ?>"><img src="assets/fb-login.png" style="width: 200px; margin-top: 20px" /></a></div>
	
    </form>

</body>
</html>
