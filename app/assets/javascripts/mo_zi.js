window.MoZi = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new MoZi.Routers.AppRouter();
    
    Backbone.history.start();
  }
};

$(document).ready(function(){
  MoZi.initialize();
});
