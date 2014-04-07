window.MoZi.Routers.AppRouter = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl
  },
  
  routes: {
    ""         : "homeShow",
    "games"    : "gamesIndex",
    "games/:id": "gameShow",
    "streams/:stream_id": "streamShow",
    "favorites": "favoritesIndex",
    "followed" : "followedIndex"
  },
  
  homeShow: function () {
    var showView = new MoZi.Views.HomeShow();
    
    this._swapView(showView);
  },
  
  gamesIndex: function () {
    var that = this;
    this.$rootEl.html("<h1 id='game-index-title'>Loading Games...</h1><br />");
    MoZi.Collections.games.fetch({
      success: function () {
        var indexView = new MoZi.Views.GamesIndex({
          router: that,
          collection: MoZi.Collections.games
        });
        
        that._swapView(indexView);
      }
    });
  },
  
  gameShow: function (id) {
    var that = this;
    this.$rootEl.html("<h3 style='text-align: center'>Loading Streams...</h3>");
    MoZi.Collections.games.getOrFetch(id, function (game) {
      var showView = new MoZi.Views.GameShow({
        model: game
      });
    
      that._swapView(showView);
    });
  },
  
  favoritesIndex: function () {
    var indexView = new MoZi.Views.FavoritesIndex({
      collection: MoZi.Collections.favoriteGames
    });
    
    MoZi.Collections.favoriteGames.fetch({
      success: this._swapView(indexView)
    });
  },
  
  followedIndex: function () {
    var indexView = new MoZi.Views.FollowedIndex({
      collection: MoZi.Collections.followedStreams
    });
    
    MoZi.Collections.followedStreams.fetch();
    
    this._swapView(indexView);
  },
  
  streamShow: function (stream_id) {
    var that = this;
    MoZi.Collections.streams.getOrFetch(stream_id, function (stream) {
      var showView = new MoZi.Views.StreamShow({
        router: that,
        model: stream
      });
      
      stream.fetch();
      
      that._swapView(showView);
    });
  },
  
  _swapView: function (view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;
    
    this.$rootEl.html(view.render().$el);
  }
})