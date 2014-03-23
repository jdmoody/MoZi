window.MoZi.Views.NavShow = Backbone.View.extend({
  template: JST["nav/show"],
  
  initialize: function (options) {
    this.router = options.router;
    this.listenTo(this.router, "route", this.render);
  },
  
  render: function () {
    if (Backbone.history.fragment !== "") {
      var renderedContent = this.template();
    
      $("#navbar").html(renderedContent);
    
      return this;
    }
  }
})