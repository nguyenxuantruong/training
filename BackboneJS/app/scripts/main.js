$(document).ready(function() {

	// todo model
	var TodoModel = Backbone.Model.extend({
		defaults: {
			title: "",
			completed: false
		},

		toggle: function() {
			this.set("completed", !this.get("completed"));
			console.log(this);
		}
	});

	// create collection for todos
	var TodoCollection = Backbone.Collection.extend({
		model: TodoModel,

		getCompleted: function() {
			return this.where({completed: true});
		},

		getNotCompleted: function() {
			return this.without.apply(this, this.getCompleted());
		}
	});

	var todos = new TodoCollection();

	// this view turns a service model into HTML. will create LI element
	var TodoView = Backbone.View.extend({
		tagName: "li",
		template: _.template($('#todoTemplate').html()),

		events: {
			"click .workCheckbox" : "toggleTodo",
			"click .delete" : "deleteTodo",
			"dblclick .work" : "displayEditTodo",
			"keypress .editWork" : "editTodo"
		},

		initialize: function() {

			// set up a event listener. The change backbone event is raised when a propety change
			this.listenTo(this.model, "change", this.render);
			this.listenTo(this.model, "destroy", this.remove);
		},

		render: function() {

			// create html
			this.$el.html(this.template(this.model.toJSON()));
			this.$('.workCheckbox').prop('checked', this.model.get('completed'));

			// check input completed
			if(this.model.get("completed")) {
				this.$(".work").addClass('line-through');
			}

			return this;
		},

		toggleTodo: function() {
			this.model.toggle();
		},

		deleteTodo: function() {
			this.model.destroy();
		},

		displayEditTodo: function() {
			if(!this.$(".workCheckbox").prop("checked")) {
				this.$(".editWork").removeClass('noDisplay').addClass('displayInline');
				this.$(".work").removeClass('displayInline').addClass('noDisplay');
			}
		},

		editTodo: function(ev) {
			if(ev.keyCode === 13 & this.$(".editWork").val() !== '') {
				this.model.set("title", this.$(".editWork").val());

				this.$(".work").removeClass('noDisplay').addClass('displayInline');
				this.$(".editWork").removeClass('displayInline').addClass('noDisplay');
			}
		}
	});

	// the main view of appication
	var App = Backbone.View.extend({

		// base the view on a exiting element
		el: $(".body"),
		footerTmpl: _.template($("#footerTodo").html()),

		initialize: function() {

			_.bindAll(this, "addTodo", "render");

			// cache these selectors
			this.list = $(".listWork");
			this.footer = $(".footer");

			// listener event on the collection
			this.listenTo(todos, "add", this.render);
			this.listenTo(todos, "change", this.render);
			this.listenTo(todos, "destroy", this.render);
			
			// get data local
			if(localStorage.todoArr !== undefined)
			todos.add(JSON.parse(localStorage.todoArr));
		},

		events: {
			"keypress .enterWork" : "addTodo",
			"click .allComplete" : "toggleAllCompleted"
		},

		render: function() {

			// set local storage
			var todoArr = [];
			todos.each(function(todo) {
				todoArr.push(todo.attributes);
			});
			localStorage.todoArr = JSON.stringify(todoArr);
			
			// remove element
			$(".listWork").children().remove();

			// crate view for every on of the sevices in the collection and add them to the page
			todos.each(function(todo) {
				var view = new TodoView({model: todo});
				this.list.append(view.render().el);
			}, this);	

			// display delete button when hover 
			var $work = $(".listWork").find("li");
			$work.hover(function() {
				$(this).find(".delete").removeClass("noDisplay").addClass("displayInline");
			}, 
			function() {
				$(this).find(".delete").removeClass("displayInline").addClass("noDisplay");
			});

			// dislay/hidden complete all and todo footer
			if(todos.length) {
				this.footer.removeClass('noDisplay').addClass('displayBlock');
				$('.allComplete').removeClass("noDisplay").addClass("display");
				this.footer.html(this.footerTmpl({completed: todos.getCompleted().length, notCompleted: todos.getNotCompleted().length}))
			}
			else {
				this.footer.removeClass('displayBlock').addClass('noDisplay');
				$('.allComplete').removeClass("display").addClass("noDisplay");
	  			$('.allComplete').find("input").prop("checked", false);
			}
		},

		addTodo: function(event) {
			var $enterWork = $(".enterWork");
			if(event.which === 13 & $enterWork.val() !== '') {
				var work = $enterWork.val();
				todos.add({title: work, completed: false});
				$enterWork.val("");
			}
		},

		toggleAllCompleted: function() {
			if($(".allComplete").find("input").prop("checked")) {
				todos.each(function(todo) {
					todo.set({"completed": true});
				});
			}
			else {
				todos.each(function(todo) {
					todo.set({"completed": false});
				});
			}
		}
	});

	new App();

	// router
	var TodoRouter = Backbone.Router.extend({

		routes: {
			"completed" : "TodoCompleted",
			"active" : "TodoActive",
			"all" : "all"
		},

		TodoCompleted: function() {
			$(".workCheckbox").each(function() {
				if(!$(this).prop("checked")) {
					$(this).parent().parent().removeClass('displayBlock').addClass('noDisplay');
				}
				else {
					$(this).parent().parent().removeClass('noDisplay').addClass('displayBlock');
				}

				$(".todoCompleted").addClass('selected');
				$(".all").removeClass('selected');
				$(".todoActive").removeClass('selected');
			});
		},

		all: function() {
			$(".workCheckbox").each(function() {
				$(this).parent().parent().removeClass('noDisplay').addClass('displayBlock');
			});
			$(".all").addClass('selected');
			$(".todoCompleted").removeClass('selected');
			$(".todoActive").removeClass('selected');
		},

		TodoActive: function() {
			$(".workCheckbox").each(function() {
				if($(this).prop("checked")) {
					$(this).parent().parent().removeClass('displayBlock').addClass('noDisplay');
				}
				else {
					$(this).parent().parent().removeClass('noDisplay').addClass('displayBlock');
				}
			});

			$(".todoActive").addClass('selected');
			$(".todoCompleted").removeClass('selected');
			$(".all").removeClass('selected');
		}
	});

	new TodoRouter();

	Backbone.history.start();

});
