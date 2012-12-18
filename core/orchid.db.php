<?php

	/***************************************************************************
	 * orchid.db.php
	 * October 2012
	 * Description : Used to do all database operations
	****************************************************************************/
	// without error reporting
	error_reporting(0);
	
	/**
	 *  Used to connect and operate a database
	 */
	class DataBase {
		
		// private vars
		private $connection;
		private $resource;
		private $sql;
		public static $queries;
		private static $_singleton;

		// get instance		
		public static function getInstance(){
			// doesn't exists? create a new one
			if (is_null (self::$_singleton)) {
				self::$_singleton = new DataBase();
			}
			// return instance
			return self::$_singleton;
		}

		// private constructor
		private function __construct(){
			// create connection
			// $this->connection = @mysql_connect('mysql1000.mochahost.com', 'erikwco_root', 'Elite_123');
			// //select database
			// mysql_select_db('erikwco_orchid_db', $this->connection);
			//
			$this->connection = @mysql_connect('localhost', 'root', 'Elite$00');
			// select database
			mysql_select_db('orchid_db', $this->connection);
			// return 
			$this->queries = 0;
			$this->resource = null;
		}
		
		// execute instruction used to get information like select
		public function execute(){
			if(!($this->resource = mysql_query($this->sql, $this->connection))){
				return null;
			}
			$this->queries++;
			return $this->resource;
		}

		// execute alter used for insert / update /delete
		public function alter(){
			if(!($this->resource = mysql_query($this->sql, $this->connection))){
				return false;
			}
			return true;
		}
		
		// load select into objects array to allow operate in a foreach
		public function loadObjectList(){
			if (!($cur = $this->execute())){
				return null;
			}
			$array = array();
			while ($row = @mysql_fetch_object($cur)){
				$array[] = $row;
			}
			return $array;	
		}

		// set query
		public function setQuery($sql){
			if(empty($sql)){
				return false;
			}
			$this->sql = $sql;
			return true;
		}

		// empty results
		public function freeResults(){
			@mysql_free_result($this->resource);
			return true;
		}

		// used to extract one value (like scalar does it)
		public function loadObject(){
			if ($cur = $this->execute()){
				if ($object = mysql_fetch_object($cur)){
					@mysql_free_result($cur);
					return $object;
				}
				else {
					return null;
				}
			}
			else {
				return false;
			}
		}

		// close all
		function __destruct(){
			@mysql_free_result($this->resource);
			@mysql_close($this->connection);
		}
	}


?>