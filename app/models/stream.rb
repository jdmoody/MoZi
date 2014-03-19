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
#

class Stream < ActiveRecord::Base
  def fetch_by_name(game)
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
          viewers: stream["viewers"]
        })
      end
    end
  end
end
