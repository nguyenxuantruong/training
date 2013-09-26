jQuery(document).ready(function($) {
	
	// handle logout
	$("#nav .logout").click(function() {

		// delete localStorage["email"];
		delete localStorage["gamePlayed"];
		delete localStorage["gsAvatar"];
		delete localStorage["gsDay"];
		// delete localStorage["gsEmail"];
		delete localStorage["gsMonth"];
		delete localStorage["gsGender"];
		delete localStorage["gsPass"];
		delete localStorage["gsUsername"];
		delete localStorage["localListGame"];
		delete localStorage["nameGame"];

		window.location = "index.html";

	});

	// Account setting
	$("#nav .accountSetting").click(function() {
        localStorage.accountSetting = true;
        window.location="index.html";
  	});
});