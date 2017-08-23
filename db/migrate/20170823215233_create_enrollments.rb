class CreateEnrollments < ActiveRecord::Migration[5.1]
  def change
    create_table :enrollments do |t|
      t.integer :student_id
      t.integer :section_id
    end
  end
end
