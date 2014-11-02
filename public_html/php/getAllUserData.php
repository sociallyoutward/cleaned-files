<?php

require once ('orm/m_i.php');
require '../lib/FirePHPCore/fb.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET'){
	if(!is_null($_GET['member'])){
        $mid = $_GET['member'];
		FB::log('Log message');
		FB::info('Info message');
		FB::warn('Warn message');
		FB::error('Error message');
		FB::info("$mid: " + $mid);
		$allData = m_i::findByMID($mid);
		if (is_null($allData))
          {
            header("HTTP/1.1 404 Not Found");
            print("Can't find the user data...");
            exit();
          }
          else
          {
            header("Content-type: application/json");
            print(json_encode($allData));
            exit();
          }
	}
}



?>