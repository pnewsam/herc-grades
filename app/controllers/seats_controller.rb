class SeatsController < ApplicationController
  before_action :authenticate_teacher!

  def index
    puts "Here is the seat index!!!!!!"
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
