class Section < ApplicationRecord
  belongs_to :course
  belongs_to :teacher
  belongs_to :term
  has_many :seats
  has_many :assignments
  has_many :students, through: :seats

  def course_name
    self.course.name
  end

  def empty?
    !self.seats.any?
  end

end
