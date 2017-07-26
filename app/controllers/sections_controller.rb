class SectionsController < ApplicationController
  before_action :authorize
  
  def index
    @sections = Section.all
  end

  def show
    @section = Section.find(params[:id])
  end
end
