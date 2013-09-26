define(["jquery", "views/view", "collections/collection", "models/model", "mock"], 
  function($, View, Collection, Model, Mock) {

    Mock.mock();

    // master view
    var AuthorListView = Backbone.View.extend({
      el: $("body"),

      initialize: function() {       

        var that = this;
        this.authorList = new Collection.AuthorList();
        this.books = null;
        this.bookId = null;
        this.authorId = null;
        this.listenTo(this.authorList, "reset", this.render);

        // rende author list
        this.gotoDB();

        // router
        var Router = Backbone.Router.extend({
            routes: {
              "authors" : "listAuthor",
              "author/:id" : "getAuthor",
              "author/:authorId/book/:bookId" : "getBookDetail"
            },

            listAuthor: function() {
              that.gotoDB();
            },

            getAuthor: function(id) {
              that.renderBooksById(id);
            },
            getBookDetail: function(authorId, bookId) {
              that.renderBookDetailById(authorId, bookId);
            }
        });

        // create router and start
        this.router = new Router();
        Backbone.history.start();
      },  

      events: {
        "click .authorList" : "gotoBM",
        "click .dashboard" : "gotoDB",
        'click .addBook' : "addBook",
        "click .listBooks .edit" : "editBook",
        'click .bookDetails .save' : "saveEditBook",
        'click .bookDetails .next' : "saveDoneBook"
      },

      render: function() {
          this.$el.find(".authors").html("");
        _.each(this.authorList.models, function(item) {        
          this.renderAuthor(item);
        },this);
      },

      renderAuthor: function(item) {
        var authorView = new View.mainView2({
          model: item
        });
        this.$el.find(".authors").append(authorView.render().el);
      },

      gotoDB: function() {

        // render dashboard page
        this.$el.find("#content").html(new View.mainView().render().el);

        // fetch data         
        this.authorList.fetch({
          reset: true
        });

        // render author 
        this.render();

        // handle navbar-inner
        $("#navbar-inner").find("li").removeClass('active');
        $("#navbar-inner").find("li:nth-child(1)").addClass('active');
      },

      gotoBM: function(event) {
        this.authorId = Number(event.currentTarget.getAttribute("authorId"));
        this.renderBooksById(this.authorId);
      },

      // go to the book manager page
      renderBooksById: function(id) {

        // get values
        var that = this,
          $currentTarget = $(event.currentTarget),
          authorId = Number(id),
          newEl = this.$el;

        this.$el.find("#content").html("<img src='images/loading.gif'/>");

        // fetch author by id    
        var author = new Collection.AuthorListById({id: authorId});
        author.fetch({reset: true});

        // display left content (name author and image author)
        author.on("reset", function() {
          var authorInfor = new View.inforAuthorView({
            model: author.models[0]
          });

          newEl.find("#content").html(authorInfor.render().el);

          // display right content
          newEl.find("#content").append(new View.mbView().render().el);
        });

        // fetch lisbook by author id
        this.books = new Collection.BooksListById({id: authorId});
        this.books.fetch({
          success: function(res) {
            that.router.navigate('author/' + authorId);
            that.books.reset(res.models);
            console.log("ok");
          }
        });   

        // bind event
        this.listenTo(this.books, 'add', this.renderBooks);
        this.listenTo(this.books, 'reset', this.renderBooksMain);

        // handle navbar-inner
        $("#navbar-inner").find("li").removeClass('active');
        $("#navbar-inner").find("li:nth-child(2)").addClass('active');

      },

      // add book
      addBook: function() {
        this.books.create({completed: "10%"});
      },

      // render book list
      renderBooksMain: function() {
        this.$el.find(".listBooks").html("");
        _.each(this.books.models, function(item) {
            this.renderBooks(item);
        }, this);

      },

      // render a book function
      renderBooks: function(item) {
        var mbview2 = new View.mbView2({
          model: item
        });
        this.$el.find(".listBooks").append(mbview2.render().el);

      },

      // edit book function
      editBook: function(event) {

        // render book detail
        var bookId = Number(event.currentTarget.getAttribute("bookId")),
            authorId = this.$el.find(".menuActivity .author").attr("authorId");

        this.renderBookDetailById(authorId, bookId);
      },

      renderBookDetailById : function(authorId, bookId) {
        var that = this,
            authorId = Number(authorId),
            bookId = Number(bookId),
            newEl = this.$el;

        // remove content
        this.$el.find("#content").html("<img src='images/loading.gif'/>");

        // fetch author by id    
        var author = new Collection.AuthorListById({id: authorId});
        author.fetch({reset: true});

        // display left content (name author and image author)
        author.on("reset", function() {
          var authorInfor = new View.inforAuthorView({
            model: author.models[0]
          });

          newEl.find("#content").html(authorInfor.render().el);

          // display right content
          // fetch author follow authorId
          that.books = new Collection.BooksListById({id: authorId});
          that.books.fetch({
            success: function(rs) {
              _.each(rs.models, function(book) {
                if(book.get("bookId") === bookId) {

                  var editView = new View.editBookView({
                    model: book
                  });
                  // this.$el.find("#content").html()
                  newEl.find(".menuActivity").after(editView.render().el);
                }
              }, that);

              // navigate
              that.router.navigate("author/" + authorId + "/book/" + that.bookId);
            }
          });
        });

        // handle navbar-inner
        $("#navbar-inner").find("li").removeClass('active');
        $("#navbar-inner").find("li:nth-child(2)").addClass('active');

        // render book detail
        this.bookId = Number(bookId);
        var authorName = this.$el.find(".menuActivity h6").text();

        // set author name
        this.$el.find("#detail .authorName").attr("value", authorName);
      },

      // save edit book function
      saveEditBook: function() {
        _.each(this.books.models, function(item) {
          if(item.get("bookId") === this.bookId) {
            item.set(
              {title: "new title"},
              {desc: "new desc"},
              {bookImg: "new path of book image"}
              );
            item.save();
          }
        }, this);
      },

      // sava done book function
      saveDoneBook: function(event) {
        var id = Number(event.currentTarget.getAttribute("authorId"));
        this.saveEditBook();
        console.log(id);
        this.renderBooksById(id);
      }
    });

    return AuthorListView;
});