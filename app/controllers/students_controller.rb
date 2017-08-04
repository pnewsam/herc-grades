class StudentsController < ApplicationController
  before_action :authenticate_teacher!

  def index
  end

  def show
  end

private
  def students
    @students ||= current_teacher.students.decorate
  end
  helper_method :students

  def student
    @student ||= current_teacher.students.find(params[:id]).decorate
  end
  helper_method :student

  def grades
    @grades ||= student.grades
  end
  helper_method :grades
end
