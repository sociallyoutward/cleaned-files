<?php

include "../dbconfig.php";

$from = $_REQUEST['from']/1000;
$to = $_REQUEST['to']/1000;
$whichCal = $_REQUEST['cal'];


//prep dates for database entry
$startDate = $connection->real_escape_string(date('Y-m-d', $from));
$endDate = $connection->real_escape_string(date('Y-m-d', $to));

if($whichCal=="main")
{
	$sql = "SELECT * FROM Event WHERE `start` BETWEEN '$startDate' and '$endDate'";
}
else if(is_numeric($whichCal))
{
    $sql = "SELECT * FROM `Event` WHERE id in (select eventid from member_event where memberid = '$whichCal')";
}
$out = array();
$result = $connection->query($sql);

//extract restults and place into array
while($row = $result->fetch_assoc()){
    $out[] = array(
        'id' => $row['id'],
        'title' => $row['title'],
        'url' => 'eventpage.php?id='. $row['id'],
        'class' =>'event-success',
        'start' => strtotime($row['start']) . '000',
        'end' => strtotime($row['end']) . '000'
    );
}
//output json for calendar
echo json_encode(array('success' => 1, 'result' => $out));
exit;