# == Schema Information
#
# Table name: games
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  logo       :string(255)
#  box        :string(255)
#  viewers    :integer
#  created_at :datetime
#  updated_at :datetime
#

class Game < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged
  
  default_scope order('viewers DESC')
  
  paginates_per 10
  
  has_many :game_favorites,
    class_name: "GameFavorite",
    foreign_key: :game_id
  
  has_many :fans,
    through: :game_favorites,
    source: :user
  
  def self.refresh
    Game.update_all("viewers = 0")
    @games = Twitch.new().getTopGames(limit: 100)[:body]["top"]
    
    @games.each do |game|
      if current_game = Game.find_by(name: game["game"]["name"])
        current_game.update_attributes(viewers: game["viewers"])
      else
        Game.create!({
          name: game["game"]["name"].gsub("'", ""),
          logo: game["game"]["logo"]["large"],
          box:  game["game"]["box"]["large"],
          viewers: game["viewers"]
        })
      end
    end
  end
  
  def ordered_stream_list
    Stream.fetch_by_game(self.name)
    Stream.where(game: self.name).sort do |stream1, stream2|
      stream2.viewers <=> stream1.viewers
    end.slice(0...25)
  end
end
