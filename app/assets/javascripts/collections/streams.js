window.MoZi.Collections.Streams = Backbone.Collection.extend({
  model: MoZi.Models.Stream,
  
  url: "/api/streams",
  
  initialize: function (models, options) {
    
    if (options) {
      this.game = options.game;
    }
  },
  
  getOrFetch: function (id, callback) {
    var model;
    var streams = this;
    if (model = this.get(id)) {
      model.fetch({
        success: callback(model)
      });
    } else {
      model = new MoZi.Models.Stream({ id: id });
      model.fetch({
        success: function () { 
          streams.add(model);
          callback(model);
        }
      });
    }
  }
});

window.MoZi.Collections.streams = new MoZi.Collections.Streams();