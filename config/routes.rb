Rails.application.routes.draw do
  devise_for :students
  devise_for :teachers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :assignments do
    patch 'grade', to: :grade
  end

  resources :sections do
    resources :seats, only: [:index, :new, :create]
    resources :assignments, only: [:new, :create]

    # Testing out nesting this resource so we can attach section ID to student creation.
    resources :students do
    end
  end

  # Check:
  resources :students do

  end

  resource :profile, only: [:show, :edit, :update]

  get '/dashboard', to: 'dashboards#show'
  root 'dashboards#show'
end
