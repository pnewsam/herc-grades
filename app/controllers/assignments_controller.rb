class AssignmentsController < ApplicationController
  before_action :authorize
  
  def index
    @assignments = Assignment.all
  end

  def show
    @assignment = Assignment.find(params[:id])
  end

  def create
    assignment = Assignment.new(assignment_params)
  end
  
  def new
  end

private
  def assignment_params
    params.require('assignment').permit('name','date_assigned','date_due')
  end
end
