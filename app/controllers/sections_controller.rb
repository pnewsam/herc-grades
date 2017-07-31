class SectionsController < ApplicationController
  before_action :authenticate_teacher!
  
  def index
    @sections = []
    # @sections = Section.where(teacher_id: current_teacher.id) || []
  end

  def show
    @section = Section.find(params[:id])
    @seats = Seat.where(section_id: @section.id)
  end

  def create
    puts section_params
    section = Section.new(section_params)
    if section.save
      redirect_to root_path
    else
      redirect_to '/sections/new'
    end
  end

  def new
    @section = Section.new
    @terms = Term.all
    @courses = Course.all
  end
  
  def edit
    @section = Section.find(params[:id])
    @terms = Term.all
    @courses = Course.all
  end

  def update
    @section = Section.find(params[:id])
    if @section.update(section_params)
      redirect_to section_path
    else
      redirect_to edit_section_path
    end
  end

  def destroy
    section = Section.find(params[:id])
    section.destroy
    redirect_to root_path
  end

  def section_params
    params.require(:section).permit(:term_id, :course_id, :academic_year_start, :academic_year_end, :period, :teacher_id)
  end
end
