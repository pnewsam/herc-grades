class AssignmentModel < ApplicationRecord
  belongs_to :course
  has_one :teacher, through: :course
  has_many :assignments
  has_many :assignment_grades, through: :assignments
end
