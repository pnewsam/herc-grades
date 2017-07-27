class Student < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :grades
  has_many :assignments, through: :grades
  has_many :seats
  has_many :sections, through: :seats

  def full_name
    first_name.to_s + ' ' + middle_name.to_s + ' ' + last_name.to_s
  end
end
