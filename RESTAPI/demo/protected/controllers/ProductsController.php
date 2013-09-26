<?php

// require 'myFunctions.php';

class ProductsController extends Controller
{
	public function actionIndex()
	{
		$this->render('index');
	}

	// get all products
	public function actionGetProducts() {

		header('Content-type: application/json');

		get user agent
		$userAgent = $_SERVER['HTTP_USER_AGENT'];
		$myFunctions = new myFunctions();

		if( strpos($userAgent, "iPhone ")!== false ) {
			echo $myFunctions::getProducts("products_iphone");
			// echo "You are using iPhone ";
		}
		else if(strpos($userAgent, "iPad")!== false) {
			echo $myFunctions::getProducts("products_ipad");
			// echo "You are using ipad";
		}
		else
			echo $myFunctions::getProducts("products");
	}

	// get product by id
	public function actionGetProductById($id) {

		header('Content-type: application/json');

		// Create connection
		$con=mysqli_connect("localhost","root","123456","mysql");

		// Check connection
		if (mysqli_connect_errno($con))
		  {
		  echo "Failed to connect to MySQL: " . mysqli_connect_error();
		  }

		$result = mysqli_query($con,"SELECT * FROM products WHERE id = $id");
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

		echo CJSON::encode($json);
	}

	// delete product by id
	public function actionDeleteProductById($id) {

		header('Content-type: application/json');
		// Create connection
		$con=mysqli_connect("localhost","root","123456","mysql");

		// Check connection
		if (mysqli_connect_errno($con))
		  {
		  echo "Failed to connect to MySQL: " . mysqli_connect_error();
		  }

		$result = mysqli_query($con,"DELETE FROM products WHERE id = $id");
	}

	// create new product
	public function actionCreateProduct() {

		header('Content-type: application/json');

		$type;

		foreach (getallheaders() as $name => $value) {
			if($name == "Content-Type")
    			$type = $value;
		}

		// check content-type
		if($type == "application/json") {

			// get data
			$post = trim(file_get_contents("php://input"));
			$data = CJSON::decode($post);


			//convert to json data
			$data = CJSON::decode($post);

			$con=mysqli_connect("localhost","root","123456","mysql");

			foreach ($data as $value) {
				$name = $value['name'];
				$date = $value["date"];

				mysqli_query($con,"INSERT INTO products (name, date) VALUES ('" . $name . "'," . "'" . $date . "')");
			}

			mysqli_close($con);
			echo "insert into database successfully";
		}
		else {
			echo "Only support json data";
		}		
	}

	// update a product
	public function actionUpdateProductById($id) {
		
		header('Content-type: application/json');

		// get content-type
		$type;
		foreach (getallheaders() as $name => $value) {
			if($name == "Content-Type")
    			$type = $value;
		}

		// check content-type
		if($type == "application/json") {

			// get data
			$post = trim(file_get_contents("php://input"));

			// convert to json data
			$data = CJSON::decode($post);

			$name = $data['name'];
			$date = $data["date"];
			$myId = intval($id);

			// insert into database
			// Create connection
			$con=mysqli_connect("localhost","root","123456","mysql");

			// Check connection
			if (mysqli_connect_errno($con))
			  {
			  echo "Failed to connect to MySQL: " . mysqli_connect_error();
			  }

			mysqli_query($con, "UPDATE products SET name = '" . $name . "', date = '" . $date . "' WHERE id = $myId");

			// close conection
			mysqli_close($con);
			echo "update database successfully";
		}

		else {
			echo "Only support json data";
		}
	}



	// -------------- handle with category--------------------------
	// get all categories
	public function actionGetCategories() {

		header('Content-type: application/json');
		// get content-type
		$type;
		foreach (getallheaders() as $name => $value) {
			if($name == "Content-Type")
    			$type = $value;
		}

		$myFunctions = new myFunctions();

		// check type
		if($type == "application/json") {
			header('Content-type: application/json');
			echo $myFunctions::categories_json();
		}

		else if ($type == "application/xml") {
			header('Content-type: application/xml');
			echo $myFunctions::categories_xml();
		}
		else {
			echo "only support json and xml data";
		}
	}

	// get categories follow json data
	public function actionGetCategories_json() {
		header('Content-type: application/json');
		$myFunctions = new myFunctions();
		echo $myFunctions::categories_json();
	}

	// get categories follow xml data
	public function actionGetCategories_xml() {
		header('Content-type: application/xml');
		$myFunctions = new myFunctions();
		echo $myFunctions::categories_xml();
	}

	// get category by id
	public function actionGetCategoryById($id) {

		// get content-type
		$type;
		foreach (getallheaders() as $name => $value) {
			if($name == "Content-Type")
    			$type = $value;
		}

		$myFunctions = new myFunctions();

		// check type
		if($type == "application/json") {
			header('Content-type: application/json');
			echo $myFunctions::getCategoryById_json($id);
		}

		else if ($type == "application/xml") {
			header('Content-type: application/xml');
			echo $myFunctions->getCategoryById_xml($id);
		}
		else {
			echo "only support json and xml data";
		}
	}

	// get category json data
	public function actionGetCategoryById_json($id) {
		header('Content-type: application/json');
		$myFunctions = new myFunctions();
		echo $myFunctions::getCategoryById_json($id);
	}

	// get category xml data
	public function actionGetCategoryById_xml($id) {
		header('Content-type: application/xml');
		$myFunctions = new myFunctions();
		echo $myFunctions::getCategoryById_xml($id);
	}

	// delete category by id
	public function actionDeleteCategoryById($id) {

		// Create connection
		$con=mysqli_connect("localhost","root","123456","mysql");

		// Check connection
		if (mysqli_connect_errno($con))
		  {
		  echo "Failed to connect to MySQL: " . mysqli_connect_error();
		  }

		$result = mysqli_query($con,"DELETE FROM categories WHERE id = $id");
	}

	// create new category
	public function actionCreateCategory() {

		// get content-type
		$type;
		foreach (getallheaders() as $name => $value) {
			if($name == "Content-Type")
    			$type = $value;
		}

		// check type
		if($type == "application/json") {
			header('Content-type: application/json');

			$post = trim(file_get_contents("php://input"));

			// convert to json data
			$data = CJSON::decode($post);

			$con=mysqli_connect("localhost","root","123456","mysql");

			foreach ($data as $value) {
				$name = $value['name'];

				mysqli_query($con,"INSERT INTO categories (name) VALUES ('" . $name . "')");
			}

			mysqli_close($con);
			echo "insert into database successfully";
		}

		else if ($type == "application/xml") {
			header('Content-type: application/xml');
			$post = trim(file_get_contents("php://input"));

			$xml = new SimpleXMLElement($post);
			foreach ($xml as $key) {
				$name = $key->name;
				mysqli_query($con,"INSERT INTO categories (name) VALUES ('" . $name . "')");

			}
			mysqli_close($con);
			echo "insert into database successfully";
		}

		else {
			echo "only support json and xml data";
		}
	}

	// update a category
	public function actionUpdateCategoryById($id) {

		// get content-type
		$type;
		foreach (getallheaders() as $name => $value) {
			if($name == "Content-Type")
    			$type = $value;
		}

		// check type
		if($type == "application/json") {
			header('Content-type: application/json');

			$post = trim(file_get_contents("php://input"));

			// convert to json data
			$data = CJSON::decode($post);

			$name = $data['name'];
			$myId = intval($id);

			// insert into database
			// Create connection
			$con=mysqli_connect("localhost","root","123456","mysql");

			// Check connection
			if (mysqli_connect_errno($con))
			  {
			  echo "Failed to connect to MySQL: " . mysqli_connect_error();
			  }

			mysqli_query($con, "UPDATE categories SET name = '" . $name . "' WHERE id = $myId");

			// close conection
			mysqli_close($con);
			echo "update database successfully";
		}

		else if ($type == "application/xml") {
			header('Content-type: application/xml');

			$post = trim(file_get_contents("php://input"));
			$xml = new SimpleXMLElement($post);

			$name = $xml->name;
			$myId = intval($id);

			// insert into database
			// Create connection
			$con=mysqli_connect("localhost","root","123456","mysql");

			// Check connection
			if (mysqli_connect_errno($con))
			  {
			  echo "Failed to connect to MySQL: " . mysqli_connect_error();
			  }

			mysqli_query($con, "UPDATE categories SET name = '" . $name . "' WHERE id = $myId");

			// close conection
			mysqli_close($con);
			echo "update database successfully";
		}
	}
}