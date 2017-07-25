class CreateSeatAssignments < ActiveRecord::Migration[5.1]
  def change
    create_table :seat_assignments do |t|
      t.integer :seat_number, null: false

      t.integer :section_id, null: false
      t.integer :student_id, null: false

      t.timestamps
    end
  end
end
