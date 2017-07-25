class AssignmentGrade < ApplicationRecord
  belongs_to :assignment
  belongs_to :student
  has_one :assignment_model, through: :assignment
end
