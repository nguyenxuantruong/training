define(['jquery', 'backbone'], function($, backbone) {

	var views = {};


	// manin view2
  	views.mainView2 = Backbone.View.extend({
	  	tagName: "li",
	  	className: "span3",
	  	template: _.template($("#authorTemplate").html()),

	  	render: function() {
	  		this.$el.html(this.template(this.model.toJSON()));
	  		return this;
	  	}
  	});

  	// main view 
  	views.mainView = Backbone.View.extend({	  	
	  	template: _.template($("#dashboardTemplate").html()),

	  	render: function() {
	  		this.$el.html(this.template());
	  		return this;
	  	}
  	});

  	// infor author view
  	views.inforAuthorView = Backbone.View.extend({
  		tagName: "div",
  		className: "menuActivity span3",
  		template: _.template($("#inforAuthorTemplate").html()),

  		render: function() {
  			
  			this.$el.html(this.template(this.model.toJSON()));
  			return this;
  		}
  	}) ;

  	// manager book view
  	views.mbView = Backbone.View.extend({
  		className: "managerBook span9",
	  	template: _.template($("#booksManagerTemplate").html()),

	  	render: function() {
	  		this.$el.html(this.template());
	  		return this;
	  	}
  	});

  	// manager book 2 view
  	views.mbView2 = Backbone.View.extend({
  		tagName: "li",
	  	template: _.template($("#listBooksTemplate").html()),

	  	initialize: function() {
	  		this.listenTo(this.model, 'destroy', this.remove);
	  	},

	  	render: function() {
	  		this.$el.html(this.template(this.model.toJSON()));
	  		return this;
	  	},
	  	events: {
          "click .delete" : "deleteBook"
        },

		deleteBook: function() {
          this.model.destroy();
        }
  	});

  	// edit book view
  	views.editBookView = Backbone.View.extend({
  		tagName: "div",
  		className : "span9 bookDetails",
  		template: _.template($('#editBookTemplate').html()),

  		render: function() {
  			this.$el.html(this.template(this.model.toJSON()));
  			return this;
  		}
  	})

  	return views;
});