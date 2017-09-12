class Section < ApplicationRecord
  belongs_to :course
  belongs_to :teacher
  belongs_to :term
  has_one :seating_chart
  has_many :seats, through: :seating_chart
  has_many :seated_students, through: :seats
  has_many :enrollments
  has_many :students, through: :enrollments
  has_many :assignments
  has_one :school, through: :teacher

  validates :period, :term_id, :course_id, :academic_year_start, :academic_year_end, presence: true

  def course_name
    self.course.name
  end

  def empty?
    !self.enrollments.any?
  end

  def ungraded_assignments
    self.assignments.select{ |assignment| !assignment.fully_graded? }
  end

end
