class RootController < ApplicationController
  def root
    @current_user = current_user
    gon.current_user = @current_user
  end
end