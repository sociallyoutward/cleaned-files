<?php
require_once('check.php');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {

    	$memberid = intval($_GET['mid']);
        $interestid = $_GET['iid'];
		$result = check::check($memberid, $interestid);
		if (is_null($result))
          {
            header("HTTP/1.1 404 Not Found");
            print("Cannot find that table row");
            exit();
          }
          else
          {
            header("Content-type: application/json");
            print(json_encode($result));
            exit();
          }

}
else {
	header("Content-type: application/json");
    print("Wrong request type");
    exit();
};

header("Content-type: application/json");
    print("Giant ERROR!");
    exit();

?>