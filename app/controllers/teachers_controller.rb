class TeachersController < ApplicationController
  def show
  end
  def create
    Teacher.new()
  end
  def new
  end
  private
  def teacher_params
    params.require(:teacher).permnit(:email,:password,:password_confirmation)
  end
end
