require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        backbone: '../bower_components/backbone/backbone',
        mockjax: '../bower_components/jquery-mockjax/jquery.mockjax',
        underscore: '../bower_components/underscore/underscore'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        backbone: {
            deps: ["jquery", "underscore"],
            exports: "backbone"
        },
        mockjax: {
            deps: ["jquery"],
            exports: "mockjax"
        }
    }
});


require(['app', 'jquery', 'bootstrap', 'router'], function (app, $, bootstrap, Router) {

    new app;
    // var router = Router;
    // Backbone.history.start();
    
});
