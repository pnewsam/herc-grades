class TeachersController < ApplicationController
  before_action :authenticate_teacher!
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

  def dashboard
    @sections = Section.where(teacher_id: current_teacher.id)
    @ungraded_assignments = Assignment.all.select{ |assignment| !assignment.fully_graded? }
  end

  def onboarding
    @terms = Term.all
    @courses = Course.all
  end
  
  private
  def teacher_params
    params.require(:teacher).permit(:email,:password,:password_confirmation)
  end
end
