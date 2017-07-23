class Section < ApplicationRecord
  belongs_to :course
  belongs_to :teacher, through: course
end
