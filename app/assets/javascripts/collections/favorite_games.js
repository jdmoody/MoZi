window.MoZi.Collections.FavoriteGames = Backbone.Collection.extend({
  model: MoZi.Models.Game,
  
  url: "api/games/favorites"
})

window.MoZi.Collections.favoriteGames = new MoZi.Collections.FavoriteGames();