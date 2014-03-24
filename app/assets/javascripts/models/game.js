window.MoZi.Models.Game = Backbone.Model.extend({
  urlRoot: "/api/games",
  
  streams: function () {
    if (!this._streams) {
      this._streams = new MoZi.Collections.Streams([], {
        game: this
      });
    }
    
    return this._streams;
  },
  
  parse: function (jsonResp) {
    if (jsonResp.streams) {
      this.streams().set(jsonResp.streams, { parse: true });
      delete jsonResp.streams;
    }

    if (jsonResp.gameFavorites) {
      this.userFavorites = jsonResp.gameFavorites;
      delete jsonResp.gameFavorites;
    }
    
    return jsonResp;
  }
})