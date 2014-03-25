class UsersController < ApplicationController
  def login_as_guest
    sign_in(:user, create_guest_user)
  end
end