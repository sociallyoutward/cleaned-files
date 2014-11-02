<?php
include "../dbconfig.php";

$id = $_GET['id'];

$sql = "SELECT * FROM Event WHERE id='$id'";
$result = $connection->query($sql);
$row = $result->fetch_assoc();
?>

<html>
	<head>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="js/atmc.js"></script>
	</head>
	<body>
		<?php
			echo '<span hidden="true" id="userid">' . $_COOKIE['user'] . '</span>';
			echo '<span id="eventid">' . $row['id'] . '</span>';
			echo '</br>';
			echo $row['title'];
			echo '</br>';
			echo $row['start'];
			echo '</br>';
			echo $row['end'];
			echo '</br>';
			echo $row['description'];
			echo '</br>';
			echo $row['pubpriv'];
			echo '</br>';
			echo $row['primaryInterest'];
			echo '</br>';
		?>
		<button id="atmc">Add To My Calendar</button>
	</body>

</html>
