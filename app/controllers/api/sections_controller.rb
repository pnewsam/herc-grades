class Api::SectionsController < ApplicationController
  def index
    @sections = Section.all
    puts @sections
    render json: @sections.to_json
  end
end