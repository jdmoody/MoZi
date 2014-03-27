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
    
    MoZi.Collections.favoriteGames.fetch();
    
    this._swapView(indexView);
  },
  
  followedIndex: function () {
    var indexView = new MoZi.Views.FollowedIndex({
      collection: MoZi.Collections.followedStreams
    });
    
    MoZi.Collections.followedStreams.fetch();
    
    this._swapView(indexView);
  },
  
  // oldStreamShow: function (game_id, stream_id) {
  //   var that = this;
  //   MoZi.Collections.games.getOrFetch(game_id, function (game) {
  //     game.streams().getOrFetch(stream_id, function (stream) {
  //       var showView = new MoZi.Views.StreamShow({
  //         router: that,
  //         model: stream
  //       });
  //       
  //       that._swapView(showView);
  //     });
  //   });
  // },
  
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