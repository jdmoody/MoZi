window.MoZi.Models.Game = Backbone.Model.extend({
  urlRoot: "/api/games",
  
  parse: function (jsonResp) {
    return jsonResp;
  }
})