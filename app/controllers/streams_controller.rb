class StreamsController < ApplicationController
  def show
    @stream = Stream.find(params[:id])
    @game = Game.find_by(name: @stream.game)
  end
end