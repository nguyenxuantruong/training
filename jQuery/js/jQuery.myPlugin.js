(function  ($) {
          // body...

          // set multi properties of an element with argument is an array. have using callback function
          $.fn.helloworld = function(options) {
                    var settings = $.extend( {
                              text: "Hello World",
                              color: null,
                              fontStyle: null,
                              complate: null
                    }, options);

                    this.each(function() {
                              $(this).text(settings.text);

                              if(settings.color) {
                                        $(this).css('color', settings.color);
                              }

                              if(settings.fontStyle) {
                                        $(this).css('font-style', settings.fontStyle);
                              }

                              if($.isFunction(settings.complate)) {
                                        settings.complate.call(this);
                              }
                    });
          }

          // set background of an element is red
          $.fn.redColor = function() {
                    return this.css('background', 'red');
          }

          // set background of an element is green
           $.fn.greenColor = function() {
                    return this.css('background', 'green');
          }

          // set background of an element is blue      
           $.fn.blueColor = function() {
                    return this.css('background', 'blue');
          }

          // show link location of a tags
          $.fn.showLinkLocation = function() {
                    return this.each( function() {
                              $(this).append(" (" + $(this).attr('href') + ") ");
                    });
          }


          // utility methods
          
}(jQuery));