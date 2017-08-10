class SeatsController < ApplicationController
  before_action :authenticate_teacher!

  def index
    section = Section.find(params[:section_id])
    seats = section.seats
    students = section.students
    response = {section: section, seats: seats, students: students}
    respond_to do |format|
      format.json { render :json => response }
    end
  end

  def new
  end

  def show
  end

  def create
  end

  def edit
  end

end
