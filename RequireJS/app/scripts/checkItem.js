define(["jquery"], function($) {
	return {
		checkItem: function() {
			var j = 0,
		  		items = $(".listWork").find(".workCheckbox");

	  		if(items.length > 0) {
	  			$(".footer").removeClass("noDisplay").addClass('displayBlock');
	  		}
	  		else {
	  			$(".footer").removeClass("displayBlock").addClass('noDisplay');
	  		}

		  	items.each(function() {
		  		if($(this).is(":checked")) {
		  			j++;
		  		}

		  		// set item complete
		  		if(j > 1) {
		  			$(".right").text(j + " items completed");
		  		}
		  		
		  		else {
		  			$(".right").text(j + " item completed");
		  		}

		  		// set item left
		  		var leftItem = items.length - j;
		  		if(leftItem > 1) {
		  			$(".left").text(leftItem + " items left");
		  		}
		  		
		  		else {
		  			$(".left").text(leftItem + " item left");
		  		}
		  	});
		}
	}
});