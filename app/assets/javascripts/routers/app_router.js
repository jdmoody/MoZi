window.MoZi.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "games": "gamesIndex",
    "games/:id": "gameShow",
    "games/:game_id/streams/:stream_id": "streamShow"
  },
  
  gamesIndex: function () {
    var that = this;
    MoZi.Collections.games.fetch({
      success: function () {
        var indexView = new MoZi.Views.GamesIndex({
          collection: MoZi.Collections.games
        });
        
        that._swapView(indexView);
      }
    });
  },
  
  gameShow: function (id) {
    var that = this;
    MoZi.Collections.games.getOrFetch(id, function (game) {
      var showView = new MoZi.Views.GameShow({
        model: game
      });
    
      that._swapView(showView);
    });
  },
  
  streamShow: function (game_id, stream_id) {
    var that = this;
    MoZi.Collections.games.getOrFetch(game_id, function (game) {
      game.streams().getOrFetch(stream_id, function (stream) {
        var showView = new MoZi.Views.StreamShow({
          model: stream
        });
        
        that._swapView(showView);
      });
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