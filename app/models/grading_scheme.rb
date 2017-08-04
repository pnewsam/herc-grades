class GradingScheme < ApplicationRecord
  has_many :grade_values
  has_many :assignments
end
