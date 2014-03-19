class HomeController < ApplicationController
  def index
    Game.refresh
    @games = Game.all
  end
end