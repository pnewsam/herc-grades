class SectionsController < ApplicationController
  before_action :authenticate_teacher!
  
  def index
  end

  def show
    @ungraded_assignments = assignments.select{ |assignment| !assignment.fully_graded? }
  end

  def create
    section = Section.new(section_params)
    if section.save
      redirect_to root_path
    else
      redirect_to new_section_path
    end
  end

  def new
  end
  
  def edit
  end

  def update
    if section.update(section_params)
      redirect_to section_path
    else
      redirect_to edit_section_path
    end
  end

  def destroy
    if section.destroy
      redirect_to root_path
    end
  end

private
  def sections
    @sections ||= current_teacher.sections.decorate
  end
  helper_method :sections

  def section
    @section ||= current_teacher.sections.find(params[:id]).decorate
  end
  helper_method :section

  def new_section
    @section = Section.new
  end
  helper_method :new_section

  def seats
    @seats ||= section.seats.decorate
  end
  helper_method :seats

  def assignments
    @assignments ||= section.assignments.decorate
  end
  helper_method :assignments

  def section_params
    params.require(:section).permit(:term_id, :course_id, :academic_year_start, :academic_year_end, :period, :teacher_id)
  end
end
