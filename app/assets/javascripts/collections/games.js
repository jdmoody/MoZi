window.MoZi.Collections.Games = Backbone.Collection.extend({
  model: MoZi.Models.Game,
  
  url: "/api/games",
  
  getOrFetch: function (id) {
    var model;
    var games = this;
    
    if (model = this.get(id)) {
      model.fetch();
      return model;
    } else {
      model = new MoZi.Models.Game({ id: id });
      model.fetch({
        success: function () { games.add(model) }
      });
      return model;
    }
  }
})

window.MoZi.Collections.games = new MoZi.Collections.Games();