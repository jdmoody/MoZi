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
#  status       :string(255)
#  views        :integer
#  follows      :integer
#

class Stream < ActiveRecord::Base
  extend FriendlyId
  friendly_id :name, use: :slugged
  
  default_scope order('viewers DESC')
  
  paginates_per 16
  
  has_many :stream_follows,
    class_name: "StreamFollow",
    foreign_key: :stream_id
  
  has_many :followers,
    through: :stream_follows,
    source: :user
  
  def self.fetch_by_game(game)
    # Resets viewers and status of games that already exist in database
    Stream.update_all("viewers = 0, status = ''", "game LIKE '#{game}'")
    
    # Fetches new streams from Twitch
    streams = Twitch.new().getStreams(game: game)[:body]["streams"]
    
    # Updates database streams corresponding to those from twitch,
    # or creates a new stream
    connection = PG.connect(dbname: ENV['DATABASE_URL'] || 'mozi_dev_db')
    Upsert.batch(connection, :streams) do |upsert|
      streams.each do |stream|
        upsert.row({name: stream["channel"]["display_name"]},
                    channel_name: stream["channel"]["name"],
                    status: stream["channel"]["status"],
                    views: stream["channel"]["views"],
                    follows: stream["channel"]["followers"],
                    logo: stream["channel"]["logo"],
                    game: stream["channel"]["game"].gsub("'", ""),
                    preview: stream["preview"]["medium"],
                    viewers: stream["viewers"],
                    slug: stream["channel"]["display_name"])
      end
    end
  end
end
