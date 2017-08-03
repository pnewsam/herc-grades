class AssignmentsController < ApplicationController  
  before_action :authenticate_teacher!

  def index
  end

  def show
  end

  def create
    assignment = Assignment.new(assignment_params)
    if assignment.save
      redirect_to assignment_path(assignment)
    else
      redirect_to new_assignment_path
    end
  end
  
  def new
  end

  def edit
  end

  def update
    if assignment.update(assignment_params)
      redirect_to assignment_path(assignment)
    end
  end

  def destroy
    if assignment.delete
      redirect_to root_path
    end
  end
  
  def grade
    assignment_params[:grades_attributes].values.each do |grade|
      assignment.grades.find(grade[:id]).update(grade: grade[:grade])
    end
    redirect_to root_path
  end

private
  def assignments
    @assignments ||= current_teacher.assignments
  end
  helper_method :assignments

  def new_assignment
    @assignment = Assignment.new
  end
  helper_method :new_assignment

  def assignment
    if params[:assignment_id]
      @assignment ||= assignments.find(params[:assignment_id])
    elsif params[:id]
      @assignment ||= assignments.find(params[:id])
    end
  end
  helper_method :assignment

  def sections
    @sections ||= current_teacher.sections.decorate
  end
  helper_method :sections

  def section
    @section ||= sections.find(params[:section_id])
  end

  def assignment_params
    params.require('assignment').permit(:name, :date_assigned, :date_due, :description, :section_id, grades_attributes: [:grade, :id])
  end
end
