class Api::StreamsController < ApplicationController
  def show
    @stream = Stream.find(params[:id])
    @game = Game.find_by(name: @stream.game)
    @stream_follows = current_user.stream_follows.map do |stream_follow|
      stream_follow.stream_id
    end
    render "streams/show"
  end
  
  def follow
    @stream = Stream.find(params[:id])
    @stream.stream_follows.create(user_id: current_user.id)
    flash[:notice] = "You are now following #{@stream.name}"
    
    render "streams/show"
  end
  
  def unfollow
    @stream = Stream.find(params[:id])
    @stream.stream_follows.where(user_id: current_user.id).destroy_all
    
    render "streams/show"
  end
end