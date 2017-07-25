class CreateAssignmentGrades < ActiveRecord::Migration[5.1]
  def change
    create_table :assignment_grades do |t|
      t.string :grade, null: :false

      t.integer :student_id, null: :false
      t.integer :assignment_id, null: :false

      t.timestamps
    end
  end
end
