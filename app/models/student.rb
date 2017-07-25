class Student < ApplicationRecord
  has_many :assignment_grades
  has_many :assignments, through: :assignment_grades
  has_many :seat_assignments
  has_many :sections, through: :seat_assignments
end
