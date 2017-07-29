Rails.application.routes.draw do
  devise_for :students
  devise_for :teachers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :assignments
  resources :sections, only: [:index, :show] do
    resources :seats, only: [:index]
  end

  resource :teacher do
    # resource :onboard, only: [:new, :create]
  end

  get '/teachers/dashboard', to: 'teachers#dashboard'
  
  root 'sections#index'
end
