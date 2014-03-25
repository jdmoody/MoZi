json.page params[:page]

@games.total_pages ||= nil
unless @games.total_pages.nil?
  json.total_pages @games.total_pages
end

json.games do
  json.array!(@games) do |game|
    json.partial!("games/game", game: game, gameFavorites: @game_favorites)
  end
end