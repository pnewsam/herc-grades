Rails.application.routes.draw do
  devise_for :students
  devise_for :teachers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :assignments
  
  resources :sections do
    resources :seats, only: [:index, :new, :create]
  end

  resources :students do
    
  end

  resource :profile, only: [:show, :edit, :update]

  get '/dashboard', to: 'dashboards#show'

  # resource :teacher do
  #   resource :onboard, only: [:new, :create]
  # end
  
  root 'dashboards#show'
end
