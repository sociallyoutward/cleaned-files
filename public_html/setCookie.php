<?php

//fbid to come from session
session_start();
require 'getUser.php';
require 'dbconfig.php';

$fbid = $_SESSION['fb_id'];

$UID = getUIDFromFBID($fbid,$connection);
setcookie('user', $UID, time()+60*60*24*30, '/', "sociallyoutward.com", false);
header("location: memberprofile.php");

?>