class TeachersController < ApplicationController
  def show
  end
  
  def create
    teacher = Teacher.new(teacher_params)
    if teacher.save?
      session[:teacher_id] = teacher.id
      redirect_to '/'
    else
      redirect_to 'signup'
    end
  end

  def new
  end
  
  private
  def teacher_params
    params.require(:teacher).permnit(:email,:password,:password_confirmation)
  end
end
