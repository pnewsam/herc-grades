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

  def destroy
    assignment = Assignment.find(params[:id])
    if assignment.delete
      redirect_to root_path
    end
  end

  
  def grade
    @assignment = Assignment.find(params[:assignment_id])
    assignment_params[:grades_attributes].values.each do |grade|
      @assignment.grades.find(grade[:id]).update(grade: grade[:grade])
    end
    redirect_to root_path
  end

private
  def assignment_params
    params.require('assignment').permit(:name, :date_assigned, :date_due, :description, :section_id, grades_attributes: [:grade, :id])
  end
end
