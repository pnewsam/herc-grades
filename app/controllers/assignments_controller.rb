class AssignmentsController < ApplicationController  
  def index
    @assignments = Assignment.all
  end

  def show
    @assignment = Assignment.find(params[:id])
  end

  def create
    assignment = Assignment.new(assignment_params)
    if assignment.save
      redirect_to "/assignments/#{assignment.id}"
    else
      redirect_to '/assignments/new'
    end
  end
  
  def new
    @assignment = Assignment.new
    @sections = Section.where(teacher_id: current_teacher.id)
  end

private
  def assignment_params
    params.require('assignment').permit(:name, :date_assigned, :date_due, :description, :section_id)
  end
end
