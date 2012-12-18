<?php
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); 
	header("Last-Modified: " . gmdate( "D, d M Y H:i:s" ) . "GMT"); 
	header("Cache-Control: no-cache, must-revalidate"); 
	header("Pragma: no-cache");
	header("Content-type: application/json");
	header("access-control-allow-origin: *");

	// include database handler file
	include '../core/orchid.db.php';
	// database instance
	$db = DataBase::getInstance();  

	// params
	$user = htmlspecialchars($_GET['username']);
	$pass = htmlspecialchars($_GET['password']);


	// data
	// $db->setQuery('SELECT * FROM orchid_db.products order by Code desc, CreationDate desc Limit 3');  
	$db->setQuery("SELECT Pass, CodeProfile, Name from users where user = '" . $user . "' and active='A'");  

	// get data in array format	  
	$dbPass = $db->loadObject();  

	if ($dbPass == null or $dbPass == false){
		echo $_GET['callback'] . '(' . "{'validUser' : false, 'Profile': 'NA' , 'Name':'visitante'" . '});';
	}else{
		if ($dbPass->Pass==$pass){
			//
			session_start();
			//
      // auth okay, setup session
      $_SESSION['user'] = $_GET['username'];
      //
      $profile= "false";
      if ($dbPass->CodeProfile == 'ADMIN'){
      	$profile = "true";
      }
      $_SESSION['profile'] = $dbPass->CodeProfile;
			//
			echo $_GET['callback'] . '(' . "{'validUser' : true,  'Name': ' " . $dbPass->Name . " ', 'Profile' : " . $profile .  '});';

		}else{
			echo $_GET['callback'] . '(' . "{'validUser' : false, 'Profile':'NA', 'Name': 'visitante'"  . '});';
		}
	}
	

	// destroy connection 
	$db = null;





?>