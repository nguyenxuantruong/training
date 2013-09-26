# REST AlPI v1 Resources

Colons can be used to align columns.

<table>
	<tr>
		<th>Resources</th>
		<th>Description</th>	
	</tr>
	<tr>
		<td><a href="http://localhost/demo/api/v1/products">GET api/v1/products</td>
		<td>Get all products
	</tr>
	<tr>
		<td><a href="#">GET api/v1/products/:id</td>
		<td>Get a product follow id <br>Eg: <a href="http://localhost/demo/api/v1/products/1">GET api/v1/products/1</a></br><b>Response</b>: <br>
		[{"id":"1","name":"apple","date":"2013-09-02"}]
	</td>
	</tr>
	<tr>
		<td><a href="#">POST api/v1/products</td>
		<td>Create a or multi new product <br>Eg: <a href="http://localhost/demo/api/v1/products/1">Post api/v1/products</a></br><b>POST Data</b>: <br>
		[{"name":"apple","date":"2013-09-02"}, {"name":"banana","date":"2014-09-09"}]
	</td>
	<tr>
		<td><a href="#">PUT api/v1/products</td>
		<td>Update a product follow id<br>Eg: <a href="http://localhost/demo/api/v1/products/1">Post api/v1/products/1</a></br><b>PUT Data</b>: <br>
		{"name":"apple","date":"2013-09-02"}
	</td>
	<tr>
		<td><a href="#">DELETE api/v1/products/:id</td>
		<td>Get a product follow id <br>Eg: <a href="http://localhost/demo/api/v1/products/1">DELETE api/v1/products/1</a></>
		Will delete product that has id = 1
	</td>
</table>