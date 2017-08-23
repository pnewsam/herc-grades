class SeatingChartsController < ApplicationController
  before_action :authenticate_teacher!

  def show
  end

  def edit
    # @grades = section.seats
  end

  def update
  end

private
  def section
    @section ||= current_teacher.sections.find(params[:section_id]).decorate
  end
  helper_method :section

end