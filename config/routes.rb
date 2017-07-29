Rails.application.routes.draw do
  devise_for :students
  devise_for :teachers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :assignments
  
  resources :sections do
    resources :seats, only: [:index]
  end

  get '/teachers/dashboard', to: 'teachers#dashboard'
  resource :teacher do
    resource :onboard, only: [:new, :create]
  end
  
  root 'teachers#dashboard'
end
