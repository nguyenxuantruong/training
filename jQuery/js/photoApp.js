$(document).ready(function() {

          // collapse
          $('#left').accordion({
                    myColor: 'green'
          });

          // dragable
          $('#Pink_Ribbon').myDragable();
          $('#flower-fix').clone().myDragable();
          $("#Decoration_3").myDragable();
          $("#Decoration_4").myDragable();
          $("#Decoration_5").myDragable();
          $("#Decoration_6").myDragable();
          $("#Decoration_7").myDragable();
          $("#Decoration_8").myDragable();

          $("#Text_1").myDragable();
          $("#Text_2").myDragable();
          $("#Text_3").myDragable();
          $("#Text_4").myDragable();

          $("#Frame1").myDisableDrag();
          $("#Frame2").myDisableDrag();
          $("#Frame3").myDisableDrag();
          $("#Frame4").myDisableDrag();



          // disable drag
          $("#headerFlower").myDisableDrag();
          $("#headerText_4").myDisableDrag();
          $("#headerFrame4").myDisableDrag();

          // dropable
          $('#right').myDropable();
          $('.frame').myDisableDrag();

          // handle frame
          $('.frame').each(function() {
               var that = $(this);
                    $(this).click(function(ev) {

                              // remove frame if it exits
                              $('#frame').children().each(function(ev) {
                                        $(this).remove();
                              });  

                              // copy new frame
                              var frame = $(this).clone();
                              frame.attr('title', 'double to remove frame');
                              frame.css({
                                   "width" : 720,
                                   "height" : 540
                              });

                              // add frame
                              frame.appendTo($('#frame'));
                              ev.stopPropagation();

                              // remove frame
                              $('#frame').children().each(function(ev) {
                                        $(this).dblclick(function(ev) {
                                                  $(this).remove();
                                        });
                              });
                              $('.frame').myDisableDrag();
                    });

                    
          });
          
         
});
