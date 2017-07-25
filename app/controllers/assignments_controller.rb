class AssignmentsController < ApplicationController
  def index
    @assignments = Assignment.all
  end
end
