class CreateGradeValues < ActiveRecord::Migration[5.1]
  def change
    create_table :grade_values do |t|
      t.string :name, null: false
      t.integer :value
      t.integer :grading_scheme_id, null: false

      t.timestamps
    end
  end
end
