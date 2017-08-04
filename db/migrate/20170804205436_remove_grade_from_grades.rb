class RemoveGradeFromGrades < ActiveRecord::Migration[5.1]
  def change
    remove_column :grades, :grade, :string
  end
end
