class Assignment < ApplicationRecord
  belongs_to :section
  has_one :course, through: :section
  has_many :grades, -> { order(:id) }

  accepts_nested_attributes_for :grades

  after_save :create_grades
  after_destroy :destroy_grades

  def fully_graded?
    return false if self.section.empty?
    self.grades.all?{|grade| grade.graded? }
  end

  def partially_graded?
    self.grades.any?{|grade| grade.graded?}
  end

  def status_tag
    if self.fully_graded?
      return "<span class='tag is-success'>Graded</span>".html_safe
    elsif self.partially_graded?
      return "<span class='tag is-warning'>Partially Graded</span>".html_safe
    else
      return "<span class='tag is-danger'>Ungraded</span>".html_safe
    end
  end

  def status_tag_large
    if self.fully_graded?
      return "<span class='tag is-success is-large'>Graded</span>".html_safe
    elsif self.partially_graded?
      return "<span class='tag is-warning is-large'>Partially Graded</span>".html_safe
    else
      return "<span class='tag is-danger is-large'>Ungraded</span>".html_safe
    end
  end

  private
  def create_grades
    self.section.seats.each do |seat|
      Grade.create(grade: '', student_id: seat.student_id, assignment_id: self.id)
    end
  end

  def destroy_grades
    self.grades.destroy_all
  end
end
