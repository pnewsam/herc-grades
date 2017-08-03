class StudentsController < ApplicationController
  before_action :authenticate_teacher!

  def show
    @student = Student.find(params[:id]).decorate
    @grades = @student.grades
  end
end
