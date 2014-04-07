window.MoZi.Views.GamesIndex = Backbone.View.extend({
  template: JST["games/index"],
  
  initialize: function (options) {
    this.router = options.router;
    this.listenTo(this.collection, "add", this.appendGames);
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.router, "route", this.removeScrollListener);
    this.listenToScrolls();
  },
  
  events: {
    "click .favorite"  : "addFavorite",
    "click .unfavorite": "removeFavorite"
  },
  
  listenToScrolls: function () {
    $(window).off('scroll');
    var callback = _.throttle(this.nextPage, 200);
    $(window).on('scroll', callback.bind(this));
  },
  
  removeScrollListener: function () {
    debugger
    $(window).off('scroll');
  },
  
  render: function () {
    if (this.scrolled) {
      return this;
    } else {
      var renderedContent = this.template({
        games: this.collection
      });
    
      this.$el.html(renderedContent);

      return this;
    }
  },
  
  appendGames: function () {
    $(".loading").hide();
    if (this.addedGames === false) {
      this.scrolled = true;
      var len = this.collection.length;
      var newGames = this.collection.slice(len - 10, len);
      _.each(newGames, function (game) {
        var renderedContent = JST["games/game"]({
          game: game
        })
        $("#games").gridalicious('append', [renderedContent]);
      });
      this.addedGames = true;
    }
  },
  
  nextPage: function () {
    if ($(window).scrollTop() > ($(document).height() - $(window).height() - 50)) {
      if (this.collection.page < this.collection.total_pages && this.collection.page < 10) {
        this.addedGames = false;
        $(".loading").show();
        this.collection.fetch({
          data: { page: this.collection.page + 1 },
          remove: false
        });
      }
    }
  },
  
  addFavorite: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget)
    
    var indexView = this;
    
    $("#favoritesModalLabel").text($target.data("game") + " Favorited");
    $("#favoritesModalBody").text($target.data("game") + " has been added to your favorites");
    
    $.ajax({
      type: "POST",
      url: "/api/game/" + $target.data("id") + "/favorite",
      complete: function () {
        indexView.switchFavoriteButton($target);
      }
    });
  },
  
  removeFavorite: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    
    var indexView = this;
    
    $("#favoritesModalLabel").text($target.data("game") + " Unfavorited");
    $("#favoritesModalBody").text($target.data("game") + " has been removed from your favorites");
    
    $.ajax({
      type: "DELETE",
      url: "/api/game/" + $target.data("id") + "/unfavorite",
      complete: function () {
        indexView.switchFavoriteButton($target);
      }
    });
  },
  
  switchFavoriteButton: function ($target) {
    var $favoriteLink = $target
    if ($favoriteLink.attr("class") === "favorite") {
      $favoriteLink.text("Unfavorite");
    } else {
      $favoriteLink.text("Favorite");
    }
    $favoriteLink.toggleClass("favorite unfavorite");
    $("#favoritesModal").modal("show");
    window.setTimeout(function () {
      $("#favoritesModal").modal("hide");
    }, 1500);
  }
});