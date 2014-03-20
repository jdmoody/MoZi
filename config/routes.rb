MoZi::Application.routes.draw do
  devise_for :users
  
  root 'home#index'
  
  resources :games, only: [:index, :show]
  get 'game/:id/favorite', to: 'games#favorite', as: 'favorite'
  
  resources :streams, only: [:index, :show]
  get 'stream/:id/follow', to: 'streams#follow', as: 'follow'
end