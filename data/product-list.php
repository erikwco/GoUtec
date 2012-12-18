<?php
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); 
	header("Last-Modified: " . gmdate( "D, d M Y H:i:s" ) . "GMT"); 
	header("Cache-Control: no-cache, must-revalidate"); 
	header("Pragma: no-cache");
	header("Content-type: application/json");


	// include database handler file
	include '../core/orchid.db.php';
	// database instance
	$db = DataBase::getInstance();  

	// data
	// $db->setQuery('SELECT * FROM orchid_db.products order by Code desc, CreationDate desc Limit 3');  
	//$db->setQuery('SELECT 	a.*,  if( ((@curRow := @curRow + 1 ) / 3) = 1, \'hidden\', \'unhidden\') as Last FROM 		orchid_db.products a  JOIN (SELECT @curRow := 0) r order by Code desc, CreationDate desc');  
	$db->setQuery('SELECT a.*, b.description as Brand from 	products a, brands b where 		a.CodeBrand =  b.Code');  

	// get data in array format	  
	$productos = $db->loadObjectList();  
	
	// convert data to json a pull
	echo json_encode($productos);

	// destroy connection 
	$db = null;

?>