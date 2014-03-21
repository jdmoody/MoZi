window.MoZi.Views.StreamShow = Backbone.View.extend({
  template: JST["streams/show"],
  
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
  },
  
  render: function () {
    var renderedContent = this.template({
      stream: this.model.get("stream")
    });
    
    this.$el.html(renderedContent);
    
    return this;
  }
})