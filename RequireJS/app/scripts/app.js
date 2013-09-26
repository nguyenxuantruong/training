define(['jquery', "checkItem", "todo", "setTodoLocal"], function($, checkItem, todo, setTodoLocal) {

	return {
		getTodo: function() {
			var workHTML = "<li>" +
	                        "<div class='displayInline work'>" +
	                            "<input type='checkbox' class='workCheckbox'><label></label>" +
	                            "<button class='delete noDisplay'>✖</button>" +
	                        "</div>" +
	                        "<input type='text' class='noDisplay editWork' value=''>" +
	                    "</li>";

	    // set focus 
	    $(".enterWork").focus();

	    // get todo on local
	    if(localStorage.requireTodo !== undefined) {
	    	var todoLocal = localStorage.requireTodo.split(','),
	        	itemsLocal = todoLocal.length;
	        	console.log(todoLocal.length);
	        	
    		for (var i = 0; i < itemsLocal; i++) {
		    	$(".listWork").append(workHTML);
		    	$('.listWork').find("label").last().text(todoLocal[i]);
	    	}
	    }

		// add work
	  	$(".enterWork").keypress(function(even) {
	  		if(even.which === 13 & $(this).val() !== '') {
	  			$('.listWork').append(workHTML);
	  			$('.listWork').find("label").last().text($(this).val());
	  			$(this).val("");

	  			todo.todo();

	  			// set todo local
		  		setTodoLocal.setLocal();
	  		}

	  		
	  	});

	  	todo.todo();

	  	// check item left and item complete
	  	checkItem.checkItem();

		}
	}
});