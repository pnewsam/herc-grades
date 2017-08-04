class StudentsController < ApplicationController
  before_action :authenticate_teacher!

  def index
  end

  def show
  end

  # def create
  # end

  # def new
  # end

  def edit
  end

  def update
    if student.update(student_params)
      redirect_to student_path(student)
      flash[:notice] = 'Student successfully updated!'
    end
  end

private
  def students
    @students ||= current_teacher.students.decorate
  end
  helper_method :students

  def student
    if params[:id]
      @student ||= current_teacher.students.find(params[:id]).decorate
    elsif params[:student_id]
      @student ||= current_teacher.students.find(params[:student_id]).decorate
    end
  end
  helper_method :student

  def grades
    @grades ||= student.grades
  end
  helper_method :grades

  def student_params
    params.require(:student).permit(:first_name, :middle_name, :last_name, :id_number, :email)
  end
end
