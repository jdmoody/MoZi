class Api::StreamsController < ApplicationController
  def index
    @streams = Stream.all
    
    render "streams/index"
  end
  
  def show
    @stream = Stream.friendly.find(params[:id])
    @game = Game.find_by(name: @stream.game)
    @stream_follows = current_user.stream_follows.map do |stream_follow|
      stream_follow.stream_id
    end
    render "streams/show"
  end
  
  def follow
    @stream = Stream.friendly.find(params[:id])
    @stream.stream_follows.create(user_id: current_user.id)
    
    render "streams/show"
  end
  
  def unfollow
    @stream = Stream.friendly.find(params[:id])
    @stream.stream_follows.where(user_id: current_user.id).destroy_all
    
    render "streams/show"
  end
  
  def followed
    @streams = current_user.followed_streams

    render "streams/followed"
  end
end