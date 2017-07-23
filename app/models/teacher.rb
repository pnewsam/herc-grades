require 'bcrypt'

class Teacher < ApplicationRecord
  include BCrypt

  has_many :courses
  has_many :sections, through: :courses

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end
end
