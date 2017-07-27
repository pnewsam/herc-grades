Rails.application.routes.draw do
  devise_for :students
  devise_for :teachers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :assignments
  resources :sections, only: [:index, :show]

  # get 'signup', to: 'teachers#new'
  # post 'teachers', to: 'teachers#create'

  get 'dashboard', to: 'sessions#dashboard'

  # get 'login', to: 'sessions#new'
  # post 'login', to: 'sessions#create'
  # get 'logout', to: 'sessions#destroy'

  root 'assignments#index'
end
