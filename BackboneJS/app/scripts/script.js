$(document).ready(function() {

	// create a model for the service
	Service = Backbone.Model.extend({
		defaults: {
			title: "",
			price: "",
			checked: false
		},

		toggle: function() {
			this.set("checked", !this.get("checked"));
		}
	});

	// create a collection of service
	var ServiceList = Backbone.Collection.extend({
		model: Service,

		// return a array only with the checked services
		getChecked: function() {
			return this.where({checked: true});
		}
	});

	// create data 
	var services = new ServiceList([
		new Service({title: "service 1", price: 100}),
		new Service({title: "service 2", price: 200}),
		new Service({title: "service 3", price: 300}),
		new Service({title: "service 4", price: 400}),
		new Service({title: "service 5", price: 500}),
		new Service({title: "service 6", price: 600}),
	]);

	// this view turns a service model into HTML. Will create LI element 
	var ServiceView = Backbone.View.extend({
		tagName: "li",

		events: {
			"click" : "toggleService"			
		},

		initialize: function() {

			// set up event listener. The change backbone event is raised when a property change
			this.listenTo(this.model, 'change', this.render);
		},

		render: function() {

			// crate html
			this.$el.html('<input type="checkbox" value="1" name="' + this.model.get('title') + '" /> ' + this.model.get('title') + '<span>$' + this.model.get('price') + '</span>');
            this.$('input').prop('checked', this.model.get('checked'));

            // returning the object is a good practice that makes chaining possible
            return this;
		},

		toggleService: function() {
			this.model.toggle();
		}
	});

	// the main view of application
	var App = Backbone.View.extend({

		// base the vieu on an exiting element
		el: $("#main"),

		initialize: function() {

			_.bindAll(this, "addItem");

			// cache these selectors
			this.total = $("#total").find("span");
			this.list = $("#services");

			// listen change event on the collection
			// this is equivalent to listening on every one of the services object in the collection
			this.listenTo(services, 'change', this.render);
			this.listenTo(services, 'add', this.render);

			// crate view for every on of the sevices in the collection and add them to the page
			services.each(function(service) {
				var view = new ServiceView({model: service});
				this.list.append(view.render().el);
			}, this);		// this is context in the callback
		},

		render: function() {

			this.list.children().remove();

			// crate view for every on of the sevices in the collection and add them to the page
			services.each(function(service) {
				var view = new ServiceView({model: service});
				this.list.append(view.render().el);
			}, this);		// this is context in the callback

			var total = 0;
			_.each(services.getChecked(), function(elem) {
				total += elem.get("price");
			});

			// update total price
			this.total.text("$" + total);
			return this;
		},

		events: {
			"click button" : "addItem"
		},

		addItem: function(){
			services.add({title: "my service", price: 700});
			console.log(services)
		}
	});

	new App();
});
