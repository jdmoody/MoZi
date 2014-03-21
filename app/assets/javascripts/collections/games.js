window.MoZi.Collections.Games = Backbone.Collection.extend({
  model: MoZi.Models.Game,
  
  url: "/api/games",
  
  getOrFetch: function (id, callback) {
    var model;
    var games = this;
    
    if (model = this.get(id)) {
      model.fetch({
        success: callback(model)
      });
    } else {
      model = new MoZi.Models.Game({ id: id });
      model.fetch({
        success: function () { 
          games.add(model);
          callback(model);
        }
      });
    }
  }
})

window.MoZi.Collections.games = new MoZi.Collections.Games();