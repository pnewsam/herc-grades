class AssignmentsController < ApplicationController  
  before_action :authenticate_teacher!

  def index
  end

  def show
  end

  def create
    @assignment = Assignment.new(assignment_params)
    if @assignment.save
      redirect_to assignment_path(@assignment)
    else
      render new_assignment_path
    end
  end
  
  def new
    @assignment = Assignment.new
  end

  def edit
  end

  def update
    if assignment.update(assignment_params)
      redirect_to assignment_path(assignment)
      flash[:notice] = 'Assignment successfully updated!'
    end
  end

  def destroy
    if assignment.delete
      redirect_to root_path
    end
  end
  
  def grade
    assignment_params[:grades_attributes].values.each do |grade|
      assignment.grades.find(grade[:id]).update(grade_value_id: grade[:grade_value_id])
    end
    redirect_to root_path
  end

private

  def assignments
    @assignments ||= current_teacher.assignments.decorate
  end
  helper_method :assignments

  def assignment
    if params[:assignment_id]
      @assignment ||= current_teacher.assignments.find(params[:assignment_id]).decorate
    elsif params[:id]
      @assignment ||= current_teacher.assignments.find(params[:id]).decorate
    end
  end
  helper_method :assignment

  def sections
    @sections ||= current_teacher.sections.decorate
  end
  helper_method :sections

  def section
    @section ||= current_teacher.sections.find(params[:section_id]).decorate
  end
  helper_method :section

  def assignment_params
    params.require('assignment').permit(:name, :date_assigned, :date_due, :description, :section_id, :grading_scheme_id, grades_attributes: [:grade_value_id, :id])
  end
end
