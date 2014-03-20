window.MoZi.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "games": "gamesIndex"
  },
  
  gamesIndex: function () {
    var that = this;
    MoZi.Collections.games.fetch({
      success: function () {
        var indexView = new MoZi.Views.GamesIndex({
          collection: MoZi.Collections.games
        });
        
        that._swapView(indexView)
      }
    });
  },
  
  _swapView: function (view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;
    
    $("body").html(view.render().$el);
  }
})