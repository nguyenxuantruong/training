/* global define */
define(['backbone', 'models/model'], function(backbone, Model) {
	'use strict';

	var collections = {};

	collections.AuthorList = Backbone.Collection.extend({
		
		url: 'api/author',

		model: Model.Author,

		parse: function(response) {
			return response.authors;
		}
	});

	collections.AuthorListById = Backbone.Collection.extend({

		initialize: function(data) {
          	this.id = data.id;
      	},
      	
		url: 'api/author',

		model: Model.Author,

		parse: function(response) {
			var that = this;
            _.each(response.authors, function(item) {
              if(item.id === that.id) {
                that.author = item;
              }
            }, that);
            return this.author;
		}
	});

	// book list collection
	collections.BooksList = Backbone.Collection.extend({
		model: Model.Book
	});

	// book list collection by id
	collections.BooksListById = Backbone.Collection.extend({
		initialize:function(data) {
			this.id = data.id;
		},

		url: 'api/books',

		model: Model.Book,

		parse: function(response) {
			var that = this;
			_.each(response.books, function(item) {
				if(item.authorId === that.id) {
					that.books = item.books;
				}
			}, that);
			return this.books;
		}
	});

	return collections;
});