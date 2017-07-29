class DashboardsController < ApplicationController
  before_action :authenticate_teacher!

  def show
    @sections = Section.where(teacher_id: current_teacher.id).order(:period)
    @ungraded_assignments = Assignment.all.select{ |assignment| !assignment.fully_graded? }
  end

end