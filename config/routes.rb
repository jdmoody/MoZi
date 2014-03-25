MoZi::Application.routes.draw do
  devise_for :users
  
  root 'root#root'
  get 'users/guest', to: 'users#login_as_guest', as: 'guest'
  namespace :api, defaults: { format: :json } do
    get 'games/favorites', to: 'games#favorites', as: 'favorites'
    resources :games, only: [:index, :show]
    post 'game/:id/favorite', to: 'games#favorite', as: 'favorite'
    delete 'game/:id/unfavorite', to: 'games#unfavorite', as: 'unfavorite'
    
  
    get 'streams/followed', to: 'streams#followed', as: 'followed'
    resources :streams, only: [:index, :show]
    post 'stream/:id/follow', to: 'streams#follow', as: 'follow'
    delete 'stream/:id/unfollow', to: 'streams#unfollow', as: 'unfollow'
  
    post 'chat', to: 'chats#message', as: 'message'
  end
end