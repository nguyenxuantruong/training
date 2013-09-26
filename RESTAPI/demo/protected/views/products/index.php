<?php
/* @var $this ProductsController */

$this->breadcrumbs=array(
	'Products',
);

// Create connection
$con=mysqli_connect("localhost","root","123456","mysql");

// Check connection
if (mysqli_connect_errno($con))
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$result = mysqli_query($con,"SELECT * FROM products");

while($row = mysqli_fetch_array($result))
  {
  echo $row['name'] . " " . $row['date'];
  echo "<br>";
  }

mysqli_close($con);


?>
<h1><?php echo $this->id . '/' . $this->action->id; ?></h1>
<p>
	You may change the content of this page by modifying
	the file <tt><?php echo __FILE__; ?></tt>.
</p>
