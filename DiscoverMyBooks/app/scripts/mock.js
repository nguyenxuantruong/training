/* global define */
define(['jquery', 'mockjax'], function($) {
	'use strict';

	/**
	 * This function is used to trigger mocking. It should be called before any AJAX request.
	 * @return {function}
	 */
	var mock = function() {

		$.ajaxSetup({
			dataType: 'json'
		});

		$.mockjax(function(settings) {

	      // GET /api/todos - Get todo list
	      if (settings.url.match(/api\/author/)) {

	        return {
	          proxy: '/scripts/data.json'
	        };
	      }

	      // GET /api/books - Get book list
	      if (settings.url.match(/api\/books/)) {

	        return {
	          proxy: '/scripts/books.json'
	        };
	      }
    	});
	};

	return {
		mock: mock
	};
});