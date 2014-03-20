class StreamsController < ApplicationController
  def show
    @stream = Stream.find(params[:id])
    @game = Game.find_by(name: @stream.game)
  end
  
  def follow
    stream = Stream.find(params[:id])
    stream.stream_follows.create(user_id: current_user.id)
    flash[:notice] = "You are now following #{stream.name}"
    redirect_to stream_path(stream)
  end
end