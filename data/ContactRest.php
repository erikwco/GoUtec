<?php 
	header("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); 
	header("Last-Modified: " . gmdate( "D, d M Y H:i:s" ) . "GMT"); 
	header("Cache-Control: no-cache, must-revalidate"); 
	header("Pragma: no-cache");
	header("Content-type: application/json");
	header("access-control-allow-origin: *");

	$method = $_SERVER['REQUEST_METHOD'];
	//// REST Decoder
	// evaluate method
	switch ($method) {
	  case 'PUT':
	    UpdateContact();
	    break;
	  case 'POST':
	    SaveContact();
	    break;
	  case 'GET':
	    GetContact();
	    break;
	  case 'HEAD':
	    echo "HEAD";
	    break;
	  case 'DELETE':
	    DeleteContact();
	    break;
	  case 'OPTIONS':
	    echo "OPTIONS";
	    break;
	  default:
	    echo "$method";
	    break;
	}

//// DB



//// REST Functions
	// GET: /Usuario/uuser
	function GetContact(){
		//
		session_start();
		// include database handler file
		include '../core/orchid.db.php';
		// database instance
		$db = DataBase::getInstance();  
		//
		if (isset($_GET["uuser"])){
			// data
			$db->setQuery("SELECT * from contacts where Code = '"  . htmlspecialchars($_GET["uuser"]) . "'");  
		}
		else
		{
			if (isset($_GET["init-rec"])){
				// data
				$db->setQuery("SELECT a.*, (select count(*) from contacts ) as records from contacts a Limit " . htmlspecialchars($_GET['init-rec'])  . ", " . htmlspecialchars($_GET['end-rec'])  );  			}
			else{
				$db->setQuery("SELECT * from contacts ");  
			}
		}
		// get data in array format	  
		$usuario = $db->loadObjectList();  
		// convert data to json a pull
		echo json_encode($usuario);
		// destroy connection 
		$db = null;
	}


	function SaveContact()
	{

		session_start();
		$data = json_decode(file_get_contents("php://input"));
		// include database handler file
		include '../core/orchid.db.php';
		// database instance
		$db = DataBase::getInstance();  
		//echo $data->Name;
		//
		$query = "insert into  contacts (user, comment) values ('" . $data->User .  "' , '" . $data->Comment . "');";
		//
		$db->setQuery($query);
		$db->execute();
		$db = null;	

		//header('HTTP/1.1 404 Not Found');  
		//
	}



	// PUT: /Usuario 
	function UpdateContact()
	{

		session_start();
		$data = json_decode(file_get_contents("php://input"));
		// include database handler file
		include '../core/orchid.db.php';
		// database instance
		$db = DataBase::getInstance();  
		//echo $data->Name;
		//
		$query = "Update contacts set readed = '" . $data->Readed .  "' , comment = '" . $data->Comment . "'  where Code='" . $data->Code . "';";
		//
		echo $query;
		$db->setQuery($query);
		$db->execute();
		$db = null;	

	}


	// DELETE: /Usuario 
	function DeleteContact()
	{

		session_start();
		// include database handler file
		include '../core/orchid.db.php';
		// database instance
		$db = DataBase::getInstance();  
		//echo $data->Name;
		//
		$query = "Delete from  contacts where Code='" .  htmlspecialchars($_GET['Code']) . "';";
		//
		$db->setQuery($query);
		$db->execute();
		$db = null;	

	}

?>