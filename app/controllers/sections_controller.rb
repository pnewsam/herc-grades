class SectionsController < ApplicationController
  before_action :authenticate_teacher!
  
  def index
    @sections = Section.where(teacher_id: current_teacher.id)
  end

  def show
    @section = Section.find(params[:id])
    @seats = Seat.where(section_id: @section.id)
  end

  def create

  end

  def new
    @section = Section.new
  end
  
end
