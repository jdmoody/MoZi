# == Schema Information
#
# Table name: streams
#
#  id           :integer          not null, primary key
#  name         :string(255)
#  channel_name :string(255)
#  logo         :string(255)
#  game         :string(255)
#  viewers      :integer
#  created_at   :datetime
#  updated_at   :datetime
#  preview      :string(255)
#

class Stream < ActiveRecord::Base
  has_many :stream_follows,
    class_name: "StreamFollow",
    foreign_key: :stream_id
  
  has_many :followers,
    through: :stream_follows,
    source: :user
  
  def self.fetch_by_game(game)
    streams = Twitch.new().getStreams(game: game)[:body]["streams"]
    
    streams.each do |stream|
      if current_stream = Stream.find_by(channel_name: stream["channel"]["name"])
        current_stream.update_attributes(viewers: stream["viewers"])
      else
        Stream.create!({
          name: stream["channel"]["display_name"],
          channel_name: stream["channel"]["name"],
          logo: stream["channel"]["logo"],
          game: stream["game"],
          preview: stream["preview"]["medium"],
          viewers: stream["viewers"]
        })
      end
    end
  end
end
