define(['jquery'], function($) {
	return {
		displayCompleteAll: function () {
			if($(".listWork").find('div').length > 0) {
		  		$('.allComplete').removeClass("noDisplay");
		  		$('.allComplete').addClass("display");
		  	}
		  	else {
		  		$('.allComplete').removeClass("display");
		  		$('.allComplete').addClass("noDisplay");
		  	}
		}
	}
});