class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_user
    @current_user ||= Teacher.find(session[:teacher_id]) if session[:teacher_id]
  end
  helper_method :current_user

  def authorize
    redirect_to '/login' unless current_user
  end
end
