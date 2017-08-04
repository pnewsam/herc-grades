class Student < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  belongs_to :school
  has_many :grades
  has_many :assignments, through: :grades
  has_many :seats
  has_many :sections, through: :seats
  has_many :teachers, through: :sections
  has_many :grade_values, through: :grades
  
  def has_grades?
    self.grade_values.where.not(name: 'Ungraded').length > 0
  end
end
