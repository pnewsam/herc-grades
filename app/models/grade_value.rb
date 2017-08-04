class GradeValue < ApplicationRecord
  has_many :grades
  belongs_to :grading_scheme
  has_one :assignment, through: :grading_scheme
end
