class School < ApplicationRecord
  has_many :teachers
  has_many :students
  has_many :course_listings
  has_many :courses, through: :course_listings
  has_many :sections, through: :teachers
end
