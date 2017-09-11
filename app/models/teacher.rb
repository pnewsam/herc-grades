class Teacher < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :school
  
  has_many :courses
  has_many :sections, -> { order(:period) }
  has_many :assignments, -> { order(:date_due) }, through: :sections
  has_many :enrollments, through: :sections
  has_many :students, -> { order(:last_name) }, through: :enrollments
  has_many :seating_charts, through: :sections
  has_many :seats, through: :seating_charts
  has_many :seated_students, -> { order(:last_name) }, through: :seats

end
