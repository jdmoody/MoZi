MoZi::Application.routes.draw do
  devise_for :users
  
  root 'home#index'
  
  resources :games, only: [:index, :show]
  resources :streams, only: [:show]
end
