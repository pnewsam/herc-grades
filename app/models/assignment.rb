class Assignment < ApplicationRecord
  belongs_to :section
  has_one :course, through: :section
  has_one :teacher, through: :section
  has_many :grades, -> { order(:id) }
  belongs_to :grading_scheme
  has_many :grade_values, through: :grading_scheme

  validates :date_assigned, :date_due, :name, :section_id, :grading_scheme_id, presence: true

  accepts_nested_attributes_for :grades

  after_create :create_grades
  after_destroy :destroy_grades

  def fully_graded?
    return false if self.section.empty?
    self.grades.all?{|grade| grade.graded? }
  end

  def partially_graded?
    self.grades.any?{|grade| grade.graded?}
  end

  private
  def create_grades
    self.section.seats.each do |seat|
      Grade.create(student_id: seat.student_id, assignment_id: self.id, grade_value_id: self.grade_values.first.id)
    end
  end

  def destroy_grades
    self.grades.destroy_all
  end
end
