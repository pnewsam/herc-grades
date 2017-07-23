class CreateAssignments < ActiveRecord::Migration[5.1]
  def change
    create_table :assignments do |t|
      t.date_time :date_assigned, null: false
      t.date_time :date_due

      t.integer :assignment_model_id, null: false
      t.integer :section_id, null: false
      
      t.timestamps
    end
  end
end
