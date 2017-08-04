class Grade < ApplicationRecord
  belongs_to :assignment
  belongs_to :student
  belongs_to :grade_value
  has_one :grading_scheme, through: :grade_value

  def graded?
    self.created_at != self.updated_at
  end

end
