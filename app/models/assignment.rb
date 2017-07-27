class Assignment < ApplicationRecord
  belongs_to :section
  has_one :course, through: :section
  has_many :grades

  def fully_graded?
    self.grades.length == self.section.seats.length
  end

  def partially_graded?
    self.grades.any?
  end
end
