json.page params[:page]
json.total_pages @games.total_pages
json.games do
  json.array!(@games) do |game|
    json.partial!("games/game", game: game, gameFavorites: @game_favorites)
  end
end