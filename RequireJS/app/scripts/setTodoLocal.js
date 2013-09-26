define(["jquery"], function($) {
	
	return {
		setLocal: function() {
			var todoLocal = [];
			$(".work").each(function() {
				todoLocal.push($(this).find("label").text());
			});	
			localStorage.requireTodo = todoLocal;
		}
	}
});