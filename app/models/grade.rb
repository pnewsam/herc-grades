class Grade < ApplicationRecord
  belongs_to :assignment
  belongs_to :student

  def graded?
    self.grade != ""
  end

end
