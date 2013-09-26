/* global define */
define(['backbone'], function(backbone) {
	'use strict';
	var models = {};

	// author model
	models.Author = Backbone.Model.extend({

  		defaults: {
	     	id: null,
	  		photo: "images/james.png",
	  		name: "",
	  		likes: 0,
	  		books: 0,
	  		reads: 0
  		}
  	});

	// book model
  	models.Book = Backbone.Model.extend({
  		defaults: {
	     	authorId: null,
	     	bookId: null,
	     	title: "this is book title",
	     	photo: "images/listBook.png",
	     	bookImg: "images/bookImage.png",
	  		completed: "10%",
	  		desc: "this is book desc"	  		
  		}
  	});

	return models;
});