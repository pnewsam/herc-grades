class DashboardsController < ApplicationController
  before_action :authenticate_teacher!

  def show
    @sections = current_teacher.sections.decorate
    @assignments = current_teacher.assignments.decorate
    @students = current_teacher.students.decorate
  end

end