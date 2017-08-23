class Section < ApplicationRecord
  belongs_to :course
  belongs_to :teacher
  belongs_to :term
  has_many :seats, -> { order(:id) }
  has_many :assignments
  has_many :students, through: :seats
  has_one :school, through: :teacher

  validates :period, :term_id, :course_id, :academic_year_start, :academic_year_end, presence: true

  accepts_nested_attributes_for :seats

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
