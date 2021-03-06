class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  
  before_filter :configure_permitted_parameters, if: :devise_controller?
  
  def after_sign_in_path_for(resource)
    "#/games"
  end
  
  def create_guest_user
    adjectives = ["Unusual", "Graceful", "Caring", "Intelligent", "Silent", "Nerdy", "Mature",
      "Bloodlusted", "Sincere", "Truthful", "Famous", "Steady", "Marked", "Red", "Coherent",
      "Obtainable", "Telling", "Enraged", "Waggish", "Succinct", "Conscious", "Typical",
      "Thankful", "Screeching", "Hulking", "Big", "Kappa", "Hushed", "Deadpan", "General", 
      "Nothin_At_All", "Languid", "Whacky", "Hungry", "Sharp", "Naughty", "Valuable", 
      "Amusing", "Glorious", "Devilish", "Aware", "Masterful", "Victorious", "Cool"]
      
	  name = "MoziGuest_#{rand(10000)}"
	  guest_user = User.create(username: name, email: "#{name}#{rand(99)}@jdmozi.com")
	  guest_user.save(validate: false)
    # guest_user.game_favorites.create(game_id: Game.all[1].id)
    # guest_user.game_favorites.create(game_id: Game.all[2].id)
    # guest_user.game_favorites.create(game_id: Game.all[3].id)
    # guest_user.game_favorites.create(game_id: Game.all[7].id)
    # guest_user.game_favorites.create(game_id: Game.all[5].id)
	  redirect_to "#/games", status: :found
	  guest_user
	end
  
  protected
  
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :username
    devise_parameter_sanitizer.for(:account_update) << :username
  end
end
