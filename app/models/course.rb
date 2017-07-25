class Course < ApplicationRecord
  belongs_to :teacher
  has_many :sections
  has_many :assignment_models
end
