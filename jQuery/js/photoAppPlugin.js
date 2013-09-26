(function($) {

          // handle collapse
          $.fn.accordion = function(options) {

                    // set value default and mix with argument
                    var setting = $.extend( {
                              myColor : "#089499"
                    }, options);

                    // get accordion groups
                    $(this).find(".accordion-group").each(function() {
                              var that = $(this);

                              // set css default for content                                 
                              $(this).find('.accordion-content').css({
                                        "display" : "none"
                               });

                              // set css default for header
                              $(this).find('.accordion-header').css({
                                        "cursor":"pointer",
                                        "color" : setting.myColor
                              });  

                              // hande click event on accordion-header
                              $(this).find(".accordion-header").click(function() {

                                        // if the accordion is openning
                                        if(that.hasClass('active')) {
                                                  that.removeClass('active');

                                                  // set css after remove class
                                                  $(this).find('.accordion-header').css({
                                                            "color" : setting.myColor,
                                                            "background" : "#ffffff"
                                                  });

                                                  // hide content by slideUp model
                                                  that.find(".accordion-content").slideUp();
                                                  $(this).css({
                                                            "color" : setting.myColor,
                                                            "background" : "#ffffff"
                                                  });

                                                  // hover on accordion-header after close
                                                  $(this).hover(
                                                            function() {
                                                                      $(this).css({
                                                                                "color" : '#ffffff',
                                                                                "background" : setting.myColor
                                                                      });
                                                            }, 
                                                            function() {
                                                                      $(this).css({
                                                                                "color" : setting.myColor,
                                                                                "background" : "#ffffff"
                                                                      });
                                                            }
                                                  );        // end hover
                                        }         // end if statement

                                        // else if the accordion is close
                                        else {

                                                  // remve class 'active' of other accordion-groups
                                                  that.siblings().removeClass('active');

                                                  // set css after remover class of other accordion-groups
                                                  that.siblings().each(function() {
                                                            $(this).find('.accordion-header').css({
                                                                      "color" : setting.myColor,
                                                                      "background" : "#ffffff"
                                                            });

                                                            // hide accordion-content by slideUp model
                                                            $(this).find(".accordion-content").slideUp();


                                                            // hover on accordion-header siblings 
                                                            $(this).find('.accordion-header').hover(
                                                                      function() {
                                                                                $(this).css({
                                                                                          "color" : '#ffffff',
                                                                                          "background" : setting.myColor
                                                                                });
                                                                      }, 
                                                                      function() {
                                                                                $(this).css({
                                                                                          "color" : setting.myColor,
                                                                                          "background" : "#ffffff"
                                                                                });
                                                                      }
                                                            );        // end hover
                                                  });

                                                  // set css for current element
                                                  that.addClass('active');           
                                                  $(this).css({
                                                            "color" : '#ffffff',
                                                            "background" : setting.myColor
                                                  });

                                                  // display accordion-content by slideDown model()
                                                  that.find('.accordion-content').slideDown();

                                                  // hover on current accordion-header
                                                  $(this).hover(function() {
                                                            $(this).css({
                                                                      "color" : '#ffffff',
                                                                      "background" : setting.myColor
                                                            });                                                                     
                                                  });
                                        }         // end else statement
                              });
                    });       // end accordion function                    
          }         // end plugin


          // hand drag
          $.fn.myDragable = function() {

                    $(this).attr('dragable' , 'true');
                    
                    // hand ondragstart event and setData
                    ondragstart = function(ev) {

                              var current = ev.target,                              

                              // get location property of element
                              x = Number(ev.clientX),
                              y = Number(ev.clientY),
                              ox = Number(current.parentNode.offsetLeft),
                              oy = Number(current.parentNode.offsetTop);

                              // set data
                              var dt = ev.dataTransfer;
                              dt.setData('id', ev.target.id);
                              dt.setData("x", x);
                              dt.setData("ox", ox);
                              dt.setData("y", y);
                              dt.setData("oy", oy);
                    }            // end ondragstart function


                    ondragover = function(ev) {
                              ev.preventDefault();
                    }

          }         // end myDragable function



          // handle dropable plugin
          $.fn.myDropable = function() {

                    var that =$(this);
                    // set allow drop
                    ondragover = function(ev) {
                              ev.preventDefault();
                    }

                    // do the drop
                    ondrop = function(ev) {    

                              ev.preventDefault();

                              // get element
                              var id = ev.dataTransfer.getData('id'),
                              current = document.getElementById(id),

                              // get location data
                              i = Number(ev.dataTransfer.getData('i'));
                              x = Number(ev.dataTransfer.getData('x')),
                              y = Number(ev.dataTransfer.getData('y')), 
                              ox = Number(ev.dataTransfer.getData('ox')),
                              oy = Number(ev.dataTransfer.getData('oy')) ;

                              // copy element
                              var newEl2, newEl, leftPrev =0;
                                    newEl2 = that.find("#" + id)[0];
                              if( !newEl2) {
                                        newEl = document.getElementById(id).parentNode.cloneNode(true);
                                        newEl.className += ' truongnguyen-resizable';
                                        newEl.setAttribute('title', "double click to remve, click to resize");

                                        that[0].insertBefore(newEl, that[0].lastChild);
                                        newEl.style.position = "relative";
                                        newEl.style.float = "left";
                              }

                              else  {

                                    that.find("#" + id).parent().prevAll().each(function() {
                                             if($(this).hasClass('truongnguyen-resizable'))
                                                       leftPrev = leftPrev  + $(this).width();
                                    });
                                   newEl = newEl2.parentNode;      
                                   newEl.setAttribute('title', "double click to remve, click to resize"); 
                                   newEl.style.position = "relative";
                                   newEl.style.top = ev.clientY - y + oy - that.offset().top - $('#frame').height();
                                   newEl.style.left = ev.clientX - x + ox - that.offset().left - leftPrev;                                 
                              }
                    
                              // double click to delete new element
                              newEl.addEventListener('dblclick', function(ev) {
                                        newEl.parentNode.removeChild(newEl);
                              });


                               // plugin resizable
                              $('.truongnguyen-resizable').each(function(ev) {
                                   var that = $(this);

                                        // get element
                                        var oldClientX, oldClientY, oldHeight, oldWidth,
                                              current = $(this).find('.truongnguyen-resizeItem'),
                                              icon = $(this).find('.truongnguyen-icon');

                                        // set default css
                                        $(this).css({
                                                  "display" : 'table-cell',
                                                  "position" : 'relative'
                                        });
                                        icon.css({
                                                  "display" : "none",
                                                  "position" : "absolute",
                                                  "right" : "0px",
                                                  "bottom" : "0px",
                                                  "background" : "url(imgs/icons.png) -80px -225px",
                                                  "width" : "20px",
                                                  "height" : "20px"
                                        });

                                        // display/hide icon                                            
                                        current.click(function(ev) {
                                                  icon.css({
                                                            "display" : "block"
                                                  });
                                                  ev.stopPropagation();
                                        });
                                        document.body.onclick = function(ev) {
                                                  if(ev.target !== current) {
                                                             icon.css("display", "none");
                                                  }
                                        }    

                                        // change cursor while hover icon
                                        icon.hover(function() {
                                                  $(this).css('cursor', 'se-resize');
                                        });

                                        // hande mousedown event 
                                        icon.mousedown(function(ev) {
                                                  oldWidth = current.width();
                                                  oldHeight = current.height();
                                                  oldClientY = ev.clientY;
                                                  oldClientX  = ev.clientX;

                                                  document.documentElement.addEventListener('mousemove', handleMousemove, false);
                                                  document.documentElement.addEventListener('mouseup', handleMouseup, false);
                                        });

                                        // handle mousemove
                                        function handleMousemove(ev) {

                                             var newWidth = Number(ev.clientX - oldClientX + oldWidth),
                                                   newHeight = Number(ev.clientY - oldClientY + oldHeight),

                                                   // to get actual of image
                                                   img = new Image();
                                                   img.src = current.attr('src');

                                              // set new size for element while move mouse
                                             current.css({
                                                       "width" : newWidth,
                                                       "height" : newHeight,
                                                       "maxWidth" : img.width,
                                                       "maxHeight" : img.height
                                             });

                                              // set new size for icon while move mouse
                                             icon.css({
                                                       "left" : current.width() - 20,
                                                       "top" : current.height() - 20
                                             });

                                             // stop onmousemove if go to maxwith and height width
                                             if( current.width() === img.width && current.height() === img.height) 
                                                       document.documentElement.removeEventListener('mousemove', handleMousemove, false);
                                             }

                                             // handle mouseup
                                             function handleMouseup(ev) {
                                                       document.documentElement.removeEventListener('mousemove', handleMousemove, false);
                                                       document.documentElement.removeEventListener('mouseup', handleMouseup, false);
                                             }
                              });                                                 
                    }                                   
          }       


          // disable drag
          $.fn.myDisableDrag = function() {

                    $(this).bind('dragstart', function() {
                              return false; 
                    });   
          }         // end disableDrag function      
})(jQuery);                    // end dropable plugin        
