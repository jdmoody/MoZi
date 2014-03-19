class GamesController < ApplicationController
  def index
    Game.refresh
    @games = Game.all[0...10]
  end
  
  def show
    @game = Game.find(params[:id])
    @streams = @game.ordered_stream_list
  end
end