class Api::GamesController < ApplicationController
  def index
    Game.refresh
    @games = Game.all[0...25]
    @game_favorites = current_user.game_favorites.map do |game_favorite|
      game_favorite.game_id
    end
    render "games/index"
  end
  
  def show
    @game = Game.find(params[:id])
    @streams = @game.ordered_stream_list
    render "games/show"
  end
  
  def favorite
    @game = Game.find(params[:id])
    @game.game_favorites.create(user_id: current_user.id)
    
    render "games/index"
  end
  
  def unfavorite
    @game = Game.find(params[:id])
    @game.game_favorites.where(user_id: current_user.id).destroy_all
    
    render "games/index"
  end
  
  def favorites
    @games = current_user.favorite_games
    
    render "games/user_favorites"
  end
end