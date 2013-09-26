jQuery(document).ready(function($) {
	
	// handle logout
	$("#nav .logout").click(function() {

		delete localStorage["gamePlayed"];
		delete localStorage["gsAvatar"];
		delete localStorage["gsDay"];
		delete localStorage["gsMonth"];
		delete localStorage["gsGender"];
		delete localStorage["gsPass"];
		delete localStorage["gsUsername"];
		delete localStorage["localListGame"];
		delete localStorage["nameGame"];

		window.location = "index.html";

	});
});