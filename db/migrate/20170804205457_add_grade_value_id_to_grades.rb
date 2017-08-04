class AddGradeValueIdToGrades < ActiveRecord::Migration[5.1]
  def change
    add_column :grades, :grade_value_id, :integer
  end
end
