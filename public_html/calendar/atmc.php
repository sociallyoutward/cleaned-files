<?php

include "../dbconfig.php";

$uid = $_POST['uid'];
$eid = $_POST['eid'];

$query = "INSERT INTO `member_event` (`memberid`, `eventid`) VALUES ('$uid', '$eid')";

$connection ->query($query);

if($connection === false) {
  trigger_error('Wrong SQL: ' . $query . ' Error: ' . $connection->error, E_USER_ERROR);
}