module SessionsHelper
  def current_user
    Teacher.find(session[:teacher_id])
  end
end