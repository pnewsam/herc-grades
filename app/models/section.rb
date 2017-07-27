class Section < ApplicationRecord
  belongs_to :course
  belongs_to :teacher
  has_many :seats
  has_many :assignments
end
