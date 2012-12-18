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

	// data
	// $db->setQuery('SELECT * FROM orchid_db.products order by Code desc, CreationDate desc Limit 3');  
	$db->setQuery('SELECT 	a.*,  if((@curRow := @curRow + 1 ) = 6, \'hidden\', \'unhidden\') as Last FROM 	.products a  JOIN (SELECT @curRow := 0) r where (a.OfferPrice is not null and a.OfferPrice >0 ) order by Code desc, CreationDate desc Limit 6');  

	// get data in array format	  
	$productos = $db->loadObjectList();  
	
	// convert data to json a pull
	echo json_encode($productos);

	// destroy connection 
	$db = null;

?>