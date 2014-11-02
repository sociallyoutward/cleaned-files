<?php

class check
{
	
	public static function check($mid, $iid) {
		
		$mysqli = new mysqli("localhost", "socia150", "socially2013!", "socia150_sodb");
		
		if (!$mysqli) {
		  die('Could not connect: ' . mysqli_error($mysqli));
		}
		//checks if user has interest
		if ($stmt = $mysqli->prepare("SELECT * FROM member_interest WHERE memberid=? and interestid=?")) {

			// Bind a variable to the parameter as integer. 
		    $stmt->bind_param("ii", $mid, $iid);
		    // Execute the statement.
		    
		    $stmt->execute();
		 
		    // Get the variables from the query.
		    $stmt->bind_result($f);
		 	
		 	//
		    $stmt->fetch(); 

		    // Close the prepared statement.
		    $stmt->close();

		}
        echo($f);

        //Don't have it
		if($f==0)
		{
        	return FALSE;
		}
		//Do have it
		else {
			return TRUE;
		};
		
		
	}
}

?>