define(["jquery", "displayCompleteAll", "checkItem", 'editWork', "setTodoLocal"], function($, displayCompleteAll, checkItem, editWork, setTodoLocal) {	
	return {
		todo: function() {
			var $work = $(".listWork").find("li"),
				$workCheckbox = $work.find(".workCheckbox");

			// display delete button when hover 
			$work.hover(function() {
				$(this).find(".delete").removeClass("noDisplay").addClass("displayInline");
			}, 
			function() {
				$(this).find(".delete").removeClass("displayInline").addClass("noDisplay");
			});

			// check input
			$workCheckbox.click(function() {
				if ($(this).is(":checked")) {
					$(this).parent().addClass('line-through');
				}
				else
					$(this).parent().removeClass('line-through');

				// check items
		  		checkItem.checkItem();
			})
		  
		  	// all complete
		  	$(".allComplete").find("input").click(function() {

		  		// check input
		  		if ($(this).is(":checked")) {
		  			$workCheckbox.attr('checked', true);
		  		}

		  		else {
		  			$workCheckbox.attr('checked', false);
		  		}

		  		// line-through text
		  		$workCheckbox.each(function() {
		  			if ($(this).is(":checked")) {
						$(this).parent().addClass('line-through');
					}
					else
						$(this).parent().removeClass('line-through');
		  		});

		  		// check items
		  		checkItem.checkItem();
		  	});

		  	// delete work
		  	$('.delete').click(function() {
		  		$(this).parent().parent().remove();

		  		// check display complete all checkbox
		  		displayCompleteAll.displayCompleteAll();

		  		// check items
		  		checkItem.checkItem();

		  		// set todo on local
		  		setTodoLocal.setLocal();
		  	});

		  	// display complete all  checkbox
		  	displayCompleteAll.displayCompleteAll();

		  	// edit work
		  	editWork.editWork();

		  	// check items
		  	checkItem.checkItem();
		}
	}
});