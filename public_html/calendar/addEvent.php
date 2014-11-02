<?php


include "../dbconfig.php";

$name = $_POST['name'];
$start = $_POST['start'];
$end = $_POST['end'];
$description = nl2br($_POST['description']);
$pubpriv = $_POST['pubpriv'];
$interest = $_POST['interest'];

$query = "INSERT INTO Event (title,start,end,description,pubpriv,primaryInterest) VALUES ('$name','$start','$end','$description','$pubpriv','$interest')";

$connection ->query($query);

if($connection === false) {
  trigger_error('Wrong SQL: ' . $query . ' Error: ' . $connection->error, E_USER_ERROR);
}