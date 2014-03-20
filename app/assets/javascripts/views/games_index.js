window.MoZi.Views.GamesIndex = Backbone.View.extend({
  template: JST["games/index"],
  
  render: function () {
    var renderedContent = this.template({
      games: this.collection
    });
    
    this.$el.html(renderedContent);

    return this;
  }
});