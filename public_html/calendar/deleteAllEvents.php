<?php
include "../dbconfig.php";

$query = "DELETE from Event where 1";
$connection ->query($query);