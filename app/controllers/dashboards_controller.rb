class DashboardsController < ApplicationController
  before_action :authenticate_teacher!

  def show
    @sections = Section.where(teacher_id: current_teacher.id).order(:period).decorate
    @ungraded_assignments = Assignment.all.select{ |assignment| !assignment.fully_graded? }
    @assignments = current_teacher.assignments
    @students = current_teacher.students.decorate
  end

end