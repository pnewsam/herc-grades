class Course < ApplicationRecord
  has_many :sections
  has_many :assignments, through: :sections
  has_many :course_listings
  has_many :schools, through: :course_listings
end
