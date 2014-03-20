json.array!(@games) do |game|
  json.partial!("games/game", game: game)
end