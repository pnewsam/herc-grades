class Assignment < ApplicationRecord
  belongs_to :section
  has_one :course, through: :section
  has_many :grades

  after_save :create_grades

  def fully_graded?
    return false if self.section.empty?
    self.grades.all?{|grade| grade.graded? }
  end

  def partially_graded?
    self.grades.any?{|grade| !grade.graded?}
  end

  private
  def create_grades
    self.section.seats.each do |seat|
      Grade.create(grade: nil, student_id: seat.student_id, assignment_id: self.id)
    end
  end
end
