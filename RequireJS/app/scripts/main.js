require.config({
  shim: {
    "backbone": {
      deps: ["jquery", "underscore"],
      exports: "Backbone"
    },
    "underscore": {
      exports: "_"
    }
  },

  paths: {
    hm: 'vendor/hm',
    esprima: 'vendor/esprima',
    jquery: 'vendor/jquery.min'
  }
});
 
require(['app'], function(app, $) {
  app.getTodo();
});