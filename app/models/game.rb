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
  
  def self.refresh
    @games = Twitch.new().getTopGames()[:body]["top"]
    
    @games.each do |game|
      if current_game = Game.find_by(name: game["game"]["name"])
        current_game.update_attributes(viewers: game["viewers"])
      else
        Game.create!({
          name: game["game"]["name"],
          logo: game["game"]["logo"]["medium"],
          box:  game["game"]["box"]["medium"],
          viewers: game["viewers"]
        })
      end
    end
  end
  
  def ordered_stream_list
    streams = Stream.fetch_by_game(self.name)
    
    
  end
end
