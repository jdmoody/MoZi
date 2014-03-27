class Api::GamesController < ApplicationController
  def index
    Game.refresh
    params[:page] ||= 1
    @games = Game.page(params[:page])
    @game_favorites = current_user.game_favorites.map do |game_favorite|
      game_favorite.game_id
    end
    render "games/index"
  end
  
  def show
    @game = Game.friendly.find(params[:id])
    @streams = @game.ordered_stream_list
    render "games/show"
  end
  
  def favorite
    @game = Game.friendly.find(params[:id])
    @game.game_favorites.create(user_id: current_user.id)
    
    head :ok
  end
  
  def unfavorite
    @game = Game.friendly.find(params[:id])
    @game.game_favorites.where(user_id: current_user.id).destroy_all
    
    head :ok
  end
  
  def favorites
    @games = current_user.favorite_games
    
    render "games/user_favorites"
  end
end