Rails.application.routes.draw do
  devise_for :students
  devise_for :teachers
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :assignments
  resources :sections, only: [:index, :show] do
    # get '/roster', to: '#roster'
    resources :seats, only: [:index]
  end

  get '/teachers/dashboard', to: 'teachers#dashboard'
  get '/teachers/onboarding', to: 'teachers#onboarding'
  
  root 'sections#index'
end
