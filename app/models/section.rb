class Section < ApplicationRecord
  belongs_to :course
  has_one :teacher, through: :course
  has_many :seats
end
