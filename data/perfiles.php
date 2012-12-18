<?php
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); 
	header("Last-Modified: " . gmdate( "D, d M Y H:i:s" ) . "GMT"); 
	header("Cache-Control: no-cache, must-revalidate"); 
	header("Pragma: no-cache");
	header("Content-type: application/json");

	//
	session_start();
	//
	$user = $_SESSION['user'];
	//

	// include database handler file
	include '../core/orchid.db.php';
	// database instance
	$db = DataBase::getInstance();  

	// data
	// $db->setQuery('SELECT * FROM orchid_db.products order by Code desc, CreationDate desc Limit 3');  
	$db->setQuery("SELECT * from users  where User = '" . $user . "'");  

	// get data in array format	  
	$usuario = $db->loadObjectList();  
	
	// convert data to json a pull
	echo $_GET['callback'] . '(' .json_encode($usuario) .  ');';

	// destroy connection 
	$db = null;

?>