class ChatsController < ApplicationController
  def message
    if !!current_user
      Pusher.trigger(params[:stream], "message",
                     {user: current_user.username, message: params[:text]})
      head :created
    else
      render json: nil
    end
  end
end