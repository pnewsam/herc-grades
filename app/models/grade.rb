class Grade < ApplicationRecord
  belongs_to :assignment
  belongs_to :student

  def graded?
    !self.grade.nil?
  end
end
