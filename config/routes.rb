Rails.application.routes.draw do
  devise_for :students
  devise_for :teachers

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    resources :sections
  end

  resources :assignments do
    patch 'grade', to: :grade
  end

  resources :sections do
    resource :seating_chart, only: [:show, :edit, :update]
    resources :seats, only: [:index, :new, :create]
    resources :assignments, only: [:new, :create]
  end

  get '/students/search', to: 'students#search'
  resources :students

  resource :profile, only: [:show, :edit, :update]

  get '/home', to: 'landing#index'

  get '/dashboard', to: 'dashboards#show'
  root 'dashboards#show'
end