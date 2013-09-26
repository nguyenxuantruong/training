<?php

	class myFunctions
	{

		// get all products 
		public function getProducts($table) {

			$status_obj = Yii::app()->cache->get('products' . $table);
			if($status_obj === FALSE) {
				
				// Create connection
				$con=mysqli_connect("localhost","root","123456","mysql");

				// Check connection
				if (mysqli_connect_errno($con))
				  {
				  echo "Failed to connect to MySQL: " . mysqli_connect_error();
				  }

				$result = mysqli_query($con,"SELECT * FROM " . $table);
				$json = array();

				while($row = mysqli_fetch_array($result))
				  {
				  	$products = array(
				  			"id" => $row['id'],
				  			"name" => $row['name'],
				  			'date' => $row['date']
				  		);
				  	array_push($json, $products);
				  }

				mysqli_close($con);

				$products = CJSON::encode($json);

				// cache
				Yii::app()->cache->set("products" . $table, $products, 10);	
			}
			
			// get cache
			return Yii::app()->cache->get('products' . $table);
		}
		
		// get categories follow json data
		public function categories_json() {

			$status_obj = Yii::app()->cache->get("categories_json");
			if($status_obj === FALSE) {

				// Create connection
				$con=mysqli_connect("localhost","root","123456","mysql");

				// Check connection
				if (mysqli_connect_errno($con))
				  {
				  echo "Failed to connect to MySQL: " . mysqli_connect_error();
				  }

				$result = mysqli_query($con,"SELECT * FROM categories");
				$json = array();

				while($row = mysqli_fetch_array($result))
				  {
				  	$categories = array(
				  			"id" => $row['id'],
				  			"name" => $row['name']
				  		);
				  	array_push($json, $categories);
				  }

				// close connection
				mysqli_close($con);

				// render result
				$status_obj = CJSON::encode($json);
				Yii::app()->cache->set("categories_json", $status_obj, 10);
			}
			return $status_obj;					
		}

		// get categories follow xml data
		public function categories_xml() {

			$status_obj = Yii::app()->cache->get("categories_xml");
			if($status_obj === FALSE) {

				// Create connection
				$con=mysqli_connect("localhost","root","123456","mysql");

				// Check connection
				if (mysqli_connect_errno($con))
				  {
				  echo "Failed to connect to MySQL: " . mysqli_connect_error();
				  }

				$result = mysqli_query($con,"SELECT * FROM categories");
				$xml = array();

				while($row = mysqli_fetch_array($result))
				  {
				  	$categories = array(
				  			"id" => $row['id'],
				  			"name" => $row['name']
				  		);
				  	array_push($xml, $categories);
				  }

				// close connection
				mysqli_close($con);
				
				// render result
				$status_obj = myFunctions::generate_valid_xml_from_array($xml);
				Yii::app()->cache->set("categories_xml", $status_obj, 10);
			}
			echo $status_obj;
		}

		// get a category by id follow json data 
		public function getCategoryById_json($id) {

			$status_obj = Yii::app()->cache->get("categoryById_json");
			if($status_obj === FALSE) {

				// Create connection
				$con=mysqli_connect("localhost","root","123456","mysql");

				// Check connection
				if (mysqli_connect_errno($con))
				  {
				  echo "Failed to connect to MySQL: " . mysqli_connect_error();
				  }

				$result = mysqli_query($con,"SELECT * FROM categories WHERE id = $id");
				$json = array();

				while($row = mysqli_fetch_array($result))
				  {
				  	$categories = array(
				  			"id" => $row['id'],
				  			"name" => $row['name']
				  		);
				  	array_push($json, $categories);
				  }

				mysqli_close($con);

				$status_obj = CJSON::encode($json);
				Yii::app()->cache->set("categoryById_json", $status_obj, 10);
			}
			return $status_obj;		
		}

		// get a category by id follow xml data
		public function getCategoryById_xml($id) {

			$status_obj = Yii::app()->cache->get("categoryById_xml");
			if($status_obj === FALSE) {

				// Create connection
				$con=mysqli_connect("localhost","root","123456","mysql");

				// Check connection
				if (mysqli_connect_errno($con))
				  {
				  echo "Failed to connect to MySQL: " . mysqli_connect_error();
				  }

				$result = mysqli_query($con,"SELECT * FROM categories WHERE id = $id");
				$json = array();

				while($row = mysqli_fetch_array($result))
				  {
				  	$categories = array(
				  			"id" => $row['id'],
				  			"name" => $row['name']
				  		);
				  	array_push($json, $categories);
				  }

				// close connection
				mysqli_close($con);
				
				// render result
	
				$status_obj = myFunctions::generate_valid_xml_from_array($json, "datas", "noe");
				Yii::app()->cache->set("categoryById_xml", $status_obj, 10);

			}
			return $status_obj;
		}

		// convert array to xml
		public function generate_valid_xml_from_array($array, $node_block='nodes', $node_name='node') {
			$xml = '<?xml version="1.0" encoding="UTF-8" ?>' . "\n";

			$xml .= '<' . $node_block . '>' . "\n";
			$xml .= myFunctions::generate_xml_from_array($array, $node_name);
			$xml .= '</' . $node_block . '>' . "\n";

			return $xml;
		}
		public function generate_xml_from_array($array, $node_name) {
			$xml = '';

			if (is_array($array) || is_object($array)) {
				foreach ($array as $key=>$value) {
					if (is_numeric($key)) {
						$key = $node_name;
					}

					$xml .= '<' . $key . '>' . "\n" .myFunctions::generate_xml_from_array($value, $node_name) . '</' . $key . '>' . "\n";
				}
			} else {
				$xml = htmlspecialchars($array, ENT_QUOTES) . "\n";
			}

			return $xml;
		}

	}
?>
