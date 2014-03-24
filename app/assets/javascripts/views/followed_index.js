window.MoZi.Views.FollowedIndex = Backbone.View.extend({
  template: JST["followed/index"],
  
  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.render);
  },
  
  events: {
    "click .unfollow": "removeFollow"
  },
  
  render: function () {
    var renderedContent = this.template({
      followedStreams: this.collection
    });
    
    this.$el.html(renderedContent);
    
    return this;
  },
  
  removeFollow: function (event) {
    event.preventDefault();
    var $target = $(event.currentTarget);
    
    var indexView = this;
    
    $.ajax({
      type: "DELETE",
      url: "/api/stream/" + $target.data("id") + "/unfollow",
      success: function () {
        indexView.collection.fetch();
      }
    });
  }
})