class ChatsController < ApplicationController
  def message
    chat_name = current_user ? current_user.email : "guest"
    Pusher[params[:stream]].trigger("message",
                   {user: chat_name, message: params[:text]})
    head :created
  end
end