class SessionsController < ApplicationController
  def new

  end
  
  def create
    teacher = Teacher.find_by_email(params[:email])
    if teacher && teacher.authenticate(params[:password])
      session[:teacher_id] = teacher.id
      redirect_to '/'
    else
      redirect_to '/login'
    end
  end

  def destroy
    session[:teacher_id] = nil
    redirect_to '/login'
  end

  def dashboard
  end
end