MoZi::Application.routes.draw do
  devise_for :users
  
  root 'root#root'
  namespace :api, defaults: { format: :json } do
    resources :games, only: [:index, :show]
    post 'game/:id/favorite', to: 'games#favorite', as: 'favorite'
    delete 'game/:id/unfavorite', to: 'games#unfavorite', as: 'unfavorite'
  
    resources :streams, only: [:index, :show]
    get 'stream/:id/follow', to: 'streams#follow', as: 'follow'
  
    post 'chat', to: 'chats#message', as: 'message'
  end
end