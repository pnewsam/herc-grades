class Course < ApplicationRecord
  belongs_to :teacher
  has_many :sections
  has_many :assignments
end
