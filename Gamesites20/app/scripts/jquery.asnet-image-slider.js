(function($) {
    $.asnetSliderBar = function(selectorContainer, selectorAsnet, settings) {
        // settings
        var config = {
            'autoSlide': 0,
            'hoverPause': 0,
            'usingKeySlide': 1,
            'usingBorderColor':1,
            'imageWidth': 320,
            'imageHeight': 240,
            'imageCount': 2,
            'autoSlideSeconds': 2000,
            'borderVertical':0,
            'borderHorizontal':0,
            'borderColor':"red",
            'fadeSpeed': 500
        };
        if (settings) {
            $.extend(config, settings);
        }

        initialStyle(selectorContainer, selectorAsnet,config);

        //Update CSS with size attribute
        $(selectorContainer).css({
            "width": (config.imageWidth + config.borderVertical * 2) * config.imageCount + "px"
            // "width": (config.imageWidth + 10) * config.imageCount + "px"            
        });
        $("#asnet-slider-nav").css({
            "width": (config.imageWidth+ config.borderVertical * 2) * config.imageCount + "px"
            // "width": (config.imageWidth + 10) * config.imageCount + "px" //todo
        });
        $("#asnet-slider-nav").css({
            "top": config.imageHeight / 2 + "px"
        });
        $(selectorAsnet).css({
            "left": "-" + (config.imageWidth + config.borderVertical * 2) + "px"
            // "left": "-" + (config.imageWidth + 10) + "px"//todo            
        });
        $(selectorAsnet + " li").css({
            "width": config.imageWidth + "px"
        });
        $(selectorAsnet + " li").css({
            "height": config.imageHeight + "px"
        });

        /*move he last list item before the first item. The purpose of this is 
        if the user clicks to slide left he will be able to see the last item.*/
        $(selectorAsnet + " li:first").before($(selectorAsnet + " li:last"));

        //check if auto sliding is enabled
        if (config.autoSlide == 1) {
            /*set the interval (loop) to call function slide with option 'right' 
            and set the interval time to the variable we declared previously */
            var timer = setInterval('slide("right")', config.autoSlideSeconds);
        }

        //check if hover pause is enabled
        if (config.hoverPause == 1) {
            //when hovered over the list 
            $(selectorAsnet).hover(function() {
                //stop the interval
                clearInterval(timer);
            }, function() {
                //and when mouseout start it again
                timer = setInterval('slide("right")', config.autoSlideSeconds);
            });
        }

        //check if key sliding is enabled
        if (config.usingKeySlide == 1) {

            //binding keypress function
            $(document).bind('keypress', function(e) {
                //keyCode for left arrow is 37 and for right it's 39 '
                if (e.keyCode == 37) {
                    //initialize the slide to left function
                    slide('left');
                } else if (e.keyCode == 39) {
                    //initialize the slide to right function
                    slide('right');
                }
            });
        }

        slide = function(selectorAsnet,where,borderWidth,slideWidth) {

            $(selectorContainer).css({
                // "padding-left" : "12px"
            });
            //get the item width
            var item_width = $(selectorAsnet + " li").outerWidth() + borderWidth * 2;
            // var item_width = $(selectorAsnet + " li").outerWidth() + 10;   //todo

            /* using a if statement and the where variable check 
            we will check where the user wants to slide (left or right)*/
            if (where == 'left') {
                //...calculating the new left indent of the unordered list (ul) for left sliding
                var left_indent = parseInt($(selectorAsnet).css('left')) + item_width;
            } else {
                //...calculating the new left indent of the unordered list (ul) for right sliding
                var left_indent = parseInt($(selectorAsnet).css('left')) - item_width;
            }

            //make the sliding effect using jQuery's animate function... '
            $(selectorAsnet + ":not(:animated)").animate({
                'left': left_indent
            }, config.fadeSpeed, function() {

                /* when the animation finishes use the if statement again, and make an ilussion
                of infinity by changing place of last or first item*/
                if (where == 'left') {
                    //...and if it slided to left we put the last item before the first item
                    $(selectorAsnet + " li:first").before($(selectorAsnet + " li:last"));
                } else {
                    //...and if it slided to right we put the first item after the last item
                    $(selectorAsnet + " li:last").after($(selectorAsnet + " li:first"));
                }
                //...and then just get back the default left indent
                $(selectorAsnet).css({
                    "left": "-" + (slideWidth + borderWidth * 2) + "px"
                    // "left": "-" + (config.imageWidth + 10) + "px" //todo
                });
            });
        };
        return this;
    };
})(jQuery);

initialStyle = function(selectorContainer, selectorAsnet,config) {
    $(selectorContainer).css({
        "font-family": '"Helvetica Neue",Helvetica,Arial,sans-serif',
        "float": "left",
        "overflow": "hidden"
        });
    if (config.usingBorderColor===1) {
        $(selectorContainer).css({
            "background": config.borderColor
        });
        
    }    
    $(selectorAsnet).css({
        "position":"relative",
        "list-style-type":"none",
        "margin": "0",
        "padding": "0",
        "width": "9999px",
        "padding-bottom":config.borderHorizontal + "px"
        // "padding-bottom":"10px",
    });

    $(selectorAsnet + " > li").css({
        "float":"left",
        "padding": "0",
        "margin": config.borderHorizontal + "px " + config.borderVertical + "px" 
        // "margin":"10px 5px"
    });

    $(selectorAsnet + " > li > img").css({
        "margin-bottom":"-4px",
        "cursor": "hand",
        "border": "0"
    });
};