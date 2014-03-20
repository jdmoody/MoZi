class StreamsController < ApplicationController
  def show
    @stream = Stream.find(params[:id])
    @game = Game.find_by(name: @stream.game)
  end
  
  def follow
    @stream = Stream.find(params[:id])
    @stream.follows.create(user_id: current_user.id)
  end
end