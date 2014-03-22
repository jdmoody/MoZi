json.(game, :id, :name, :logo, :box, :viewers)

streams ||= nil
unless streams.nil?
  json.streams(streams) do |stream|
    json.partial!("streams/stream", stream: stream)
  end
end

gameFavorites ||= nil
unless gameFavorites.nil?
  json.partial!("game_favorites/game_favorite", gameFavorites: gameFavorites)
end