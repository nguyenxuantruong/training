require.config({
  paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});
 
require(['jquery', 'bootstrap'], function ($) {
    // console.log('Running jQuery %s', $().jquery);
    console.log('Running jQuery %s', $().jquery);

    $(".upload").find("button").click(function(event) { 
        $(".body1").removeClass('display').addClass('noDisplay');
        $(".body2").removeClass('noDisplay').addClass('display');                  
        $(".body2 .radioSingle").prop("checked", true);
    });

    $(".radioSingle").click(function(event) {
        $(".body3").removeClass('display').addClass('noDisplay');
        $(".body2").removeClass('noDisplay').addClass('display');
        $(".body2 .radioSingle").prop("checked", true);
    });

    $(".radioMulti").click(function(event) {
        $(".body2").removeClass('display').addClass('noDisplay');
        $(".body3").removeClass('noDisplay').addClass('display');
        $(".body3 .radioMulti").prop("checked", true);
    });

    $(".next").click(function(event) {
        window.location = "booksManager2.html";
    });
});
