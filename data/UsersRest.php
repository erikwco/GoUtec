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
	    UpdateUser();
	    break;
	  case 'POST':
	    SaveUser();
	    break;
	  case 'GET':
	    GetUsers();
	    break;
	  case 'HEAD':
	    echo "HEAD";
	    break;
	  case 'DELETE':
	    DeleteUser();
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
	function GetUsers(){
		//
		session_start();
		// include database handler file
		include '../core/orchid.db.php';
		// database instance
		$db = DataBase::getInstance();  
		//
		if (isset($_GET["uuser"])){
			// data
			$db->setQuery("SELECT * from users where User = '"  . htmlspecialchars($_GET["uuser"]) . "'");  
		}
		else
		{
			if (isset($_GET["init-rec"])){
				// data
				$db->setQuery("SELECT a.*, (select count(*) from users ) as records from users a Limit " . htmlspecialchars($_GET['init-rec'])  . ", " . htmlspecialchars($_GET['end-rec'])  );  			}
			else{
				$db->setQuery("SELECT * from users ");  
			}
		}
		// get data in array format	  
		$usuario = $db->loadObjectList();  
		// convert data to json a pull
		echo json_encode($usuario);
		// destroy connection 
		$db = null;
	}


	function SaveUser()
	{

		session_start();
		$data = json_decode(file_get_contents("php://input"));
		// include database handler file
		include '../core/orchid.db.php';
		// database instance
		$db = DataBase::getInstance();  
		//echo $data->Name;
		//
		$query = "insert into  users (Name, Active, CodeProfile, Pass, User) values ('" . $data->Name .  "' , '" . $data->Active . "', '" . $data->CodeProfile . "', '" . $data->Pass . "','" . $data->User . "');";
		//
		$db->setQuery($query);
		$db->execute();
		$db = null;	

		//header('HTTP/1.1 404 Not Found');  
		//
	}



	// PUT: /Usuario 
	function UpdateUser()
	{

		session_start();
		$data = json_decode(file_get_contents("php://input"));
		// include database handler file
		include '../core/orchid.db.php';
		// database instance
		$db = DataBase::getInstance();  
		//echo $data->Name;
		//
		$query = "Update users set name = '" . $data->Name .  "' , Active = '" . $data->Active . "', CodeProfile ='" . $data->CodeProfile . "', Pass = '" . $data->Pass . "'  where User='" . $data->User . "';";
		//
		echo $query;
		$db->setQuery($query);
		$db->execute();
		$db = null;	

	}


	// DELETE: /Usuario 
	function DeleteUser()
	{

		session_start();
		// include database handler file
		include '../core/orchid.db.php';
		// database instance
		$db = DataBase::getInstance();  
		//echo $data->Name;
		//
		$query = "Delete from  users where User='" .  htmlspecialchars($_GET['User']) . "';";
		//
		$db->setQuery($query);
		$db->execute();
		$db = null;	

	}

?>