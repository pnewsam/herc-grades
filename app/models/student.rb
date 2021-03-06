class Student < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  
  belongs_to :school
  has_many :grades
  has_many :assignments, through: :grades
  has_many :enrollments
  has_many :sections, through: :enrollments
  has_many :teachers, through: :sections
  has_many :grade_values, through: :grades
  
  include PgSearch
  pg_search_scope :search_by_name, :against => [:first_name, :last_name]

  def has_grades?
    self.grade_values.where.not(name: 'Ungraded').length > 0
  end
end
