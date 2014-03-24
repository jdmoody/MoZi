window.MoZi.Views.GamesIndex = Backbone.View.extend({
  template: JST["games/index"],
  
  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },
  
  events: {
    "click .favorite"  : "addFavorite",
    "click .unfavorite": "removeFavorite"
  },
  
  render: function () {
    var renderedContent = this.template({
      games: this.collection
    });
    
    this.$el.html(renderedContent);

    return this;
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
      success: function () {
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
      success: function () {
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