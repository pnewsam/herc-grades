class TeachersController < ApplicationController
  def show
  end
  
  def create
    teacher = Teacher.new(teacher_params)
    if teacher.save
      session[:teacher_id] = teacher.id
      redirect_to '/'
    else
      redirect_to 'signup'
    end
  end

  def new
    @teacher = Teacher.new
  end
  
  private
  def teacher_params
    params.require(:teacher).permit(:email,:password,:password_confirmation)
  end
end
