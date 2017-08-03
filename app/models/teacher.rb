class Teacher < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :courses
  has_many :sections, -> { order(:period) }
  has_many :assignments, through: :sections
  has_many :seats, through: :sections
  has_many :students, through: :seats

end
