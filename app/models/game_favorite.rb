# == Schema Information
#
# Table name: game_favorites
#
#  id         :integer          not null, primary key
#  game_id    :integer
#  user_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

class GameFavorite < ActiveRecord::Base
  belongs_to :game
  belongs_to :user
end
