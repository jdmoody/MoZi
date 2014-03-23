window.MoZi.Views.HomeShow = Backbone.View.extend({
  template: JST["home/show"],
  
  render: function () {
    var renderedContent = this.template();
    
    this.$el.html(renderedContent);
    
    return this;
  }
});