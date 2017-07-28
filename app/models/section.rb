class Section < ApplicationRecord
  belongs_to :course
  belongs_to :teacher
  belongs_to :term
  has_many :seats
  has_many :assignments

  def course_name
    self.course.name
  end

  def period_and_course_name
    self.period.to_s + ' - ' + self.course.name
  end
end
