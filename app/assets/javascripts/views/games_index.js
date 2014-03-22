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
    
    $.ajax({
      type: "POST",
      url: "/api/game/" + $(event.currentTarget).data("id") + "/favorite",
    });
    
    this.collection.fetch();
    this.render();
  },
  
  removeFavorite: function (event) {
    event.preventDefault();
    
    $.ajax({
      type: "DELETE",
      url: "/api/game/" + $(event.currentTarget).data("id") + "/unfavorite",
    });
    
    this.collection.fetch();
    this.render();
  }
});