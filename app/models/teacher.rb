# require 'bcrypt'

class Teacher < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  # include BCrypt

  # has_secure_password

  has_many :courses
  has_many :sections, through: :courses
  has_many :assignment_models, through: :courses

end
