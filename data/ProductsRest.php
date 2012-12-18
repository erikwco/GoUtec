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
	    UpdateProduct();
	    break;
	  case 'POST':
	    SaveProduct();
	    break;
	  case 'GET':
	    GetProducts();
	    break;
	  case 'HEAD':
	    echo "HEAD";
	    break;
	  case 'DELETE':
	    DeleteProduct();
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
	function GetProducts(){
		//
		session_start();
		// include database handler file
		include '../core/orchid.db.php';
		// database instance
		$db = DataBase::getInstance();  
		//
		if (isset($_GET["init-rec"])){
			// data
			$db->setQuery("SELECT a.*, (select count(*) from products ) as records from products a Limit " . htmlspecialchars($_GET['init-rec'])  . ", "  . htmlspecialchars($_GET['end-rec']));  			}
		else{
			$db->setQuery("SELECT * from products ");  
		}
		// get data in array format	  
		$usuario = $db->loadObjectList();  
		// convert data to json a pull
		echo json_encode($usuario);
		// destroy connection 
		$db = null;
	}


	function SaveProduct()
	{

		session_start();
		$data = json_decode(file_get_contents("php://input"));
		// include database handler file
		include '../core/orchid.db.php';
		// database instance
		$db = DataBase::getInstance();  
		//echo $data->Name;
		//
		$query = "insert into  products (Code, Name, Status, Price, OfferPrice, CodeBrand, Description, ImagePath) values ('" . $data->Code .  "' , '" . $data->Name . "', '" . $data->Status . "', '" . $data->Price . "','" . $data->OfferPrice . "','" . $data->CodeBrand . "','" . $data->Description . "','prd_01.jpg');";
		//
		$db->setQuery($query);
		$db->execute();
		$db = null;	

		//header('HTTP/1.1 404 Not Found');  
		//
	}



	// PUT: /Usuario 
	function UpdateProduct()
	{

		session_start();
		$data = json_decode(file_get_contents("php://input"));
		// include database handler file
		include '../core/orchid.db.php';
		// database instance
		$db = DataBase::getInstance();  
		//echo $data->Name;
		//
		$query = "Update products set Name = '" . $data->Name .  "' , Status = '" . $data->Status . "', CodeBrand ='" . $data->CodeBrand . "', Price = '" . $data->Price . "', OfferPrice = '" . $data->OfferPrice . "' , Description = '" . $data->Description . "'  where Code='" . $data->Code . "';";
		//
		echo $query;
		$db->setQuery($query);
		$db->execute();
		$db = null;	

	}


	// DELETE: /Usuario 
	function DeleteProduct()
	{

		session_start();
		// include database handler file
		include '../core/orchid.db.php';
		// database instance
		$db = DataBase::getInstance();  
		//echo $data->Name;
		//
		$query = "Delete from  products where Code='" .  htmlspecialchars($_GET['Code']) . "';";
		//
		$db->setQuery($query);
		$db->execute();
		$db = null;	

	}

?>