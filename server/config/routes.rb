Rails.application.routes.draw do
  resources :todos
  patch '/todos/:id/status', to: 'todos#updateStatus'
  patch '/todos/:id/priority', to: 'todos#updatePriority'
  post '/register', to: 'users#register'
  post '/login', to: 'users#login'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
