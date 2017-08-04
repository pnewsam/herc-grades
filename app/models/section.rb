class Section < ApplicationRecord
  belongs_to :course
  belongs_to :teacher
  belongs_to :term
  has_many :seats, -> { order(:id) }
  has_many :assignments
  has_many :students, through: :seats

  def course_name
    self.course.name
  end

  def empty?
    !self.seats.any?
  end

  def ungraded_assignments
    self.assignments.select{ |assignment| !assignment.fully_graded? }
  end

end
