window.MoZi.Views.FavoritesIndex = Backbone.View.extend({
  template: JST["favorites/index"],
  
  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.render);
  },
  
  events: {
    "click .unfavorite": "removeFavorite"
  },
  
  render: function () {
    var renderedContent = this.template({
      favorites: this.collection
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  removeFavorite: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    
    var indexView = this;
    
    $.ajax({
      type: "DELETE",
      url: "/api/game/" + $target.data("id") + "/unfavorite",
      complete: function () {
        indexView.collection.fetch();
      }
    });
  }
})