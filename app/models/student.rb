class Student < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :assignment_grades
  has_many :assignments, through: :assignment_grades
  has_many :seat_assignments
  has_many :sections, through: :seat_assignments
end
