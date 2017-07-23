class CreateSections < ActiveRecord::Migration[5.1]
  def change
    create_table :sections do |t|
      t.integer :period, null: false
      t.string :course_name, null: false
      t.integer :academic_year_start, null: false
      t.integer :academic_year_end, null: false
      t.string :semester, null: false

      t.integer :teacher_id, null: false

      t.timestamps
    end
  end
end
