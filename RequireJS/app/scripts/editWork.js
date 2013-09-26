define(["jquery"], function($) {
	return {
		editWork: function() {
			$(".listWork").find('li').dblclick(function() {
				if (!$(".workCheckbox").is(":checked")) {
					$(this).find(".work").removeClass("displayInline").addClass("noDisplay");
					$(this).find(".editWork").removeClass("noDisplay").addClass("displayBlock");
					$(this).find(".editWork").val($(this).find("label").text());
				}
			});

			$(".listWork .editWork").keypress(function(even) {
				if(even.which === 13 & $(this).val() !== '') {
					$(this).removeClass("displayBlock").addClass("noDisplay");
					$(this).prev().removeClass("noDisplay").addClass("displayInline");
					$(this).prev().find("label").text($(this).val());
				}
			});	
		}
	}
});