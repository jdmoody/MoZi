window.MoZi = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var moziRouter = new MoZi.Routers.AppRouter({
      $rootEl: $("#content")
    });
    
    new MoZi.Views.NavShow({
      router: moziRouter
    });
    
    Backbone.history.start();
  }
};

$(document).ready(function(){
  MoZi.initialize();
});