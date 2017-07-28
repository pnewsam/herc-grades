class OnboardsController < ApplicationController
  def new
    @terms = Term.all
    @courses = Course.all
  end

  def create
    Teacher
    redirect_to "/teachers/#{current_teacher.id}"
  end
end
