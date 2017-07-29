class ProfilesController < ApplicationController
  def show
    @teacher = Teacher.find(current_teacher.id)
  end

  def edit
    @teacher = Teacher.find(current_teacher.id)
  end

  def update
    @teacher = Teacher.find(current_teacher.id)
  end
end
