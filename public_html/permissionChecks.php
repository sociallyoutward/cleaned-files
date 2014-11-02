<?php

if(!isset($_COOKIE['user']))
    {
	header('location: index.php');
    }
session_start();

if(!isset($_SESSION['fb_token']))
{
	include 'reauthenticate.php';
}
?>