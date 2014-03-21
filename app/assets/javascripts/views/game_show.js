window.MoZi.Views.GameShow = Backbone.View.extend({
  template: JST["games/show"],
  
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({
      game: this.model
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
});