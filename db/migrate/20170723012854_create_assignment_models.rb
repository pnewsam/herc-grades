class CreateAssignmentModels < ActiveRecord::Migration[5.1]
  def change
    create_table :assignment_models do |t|
      t.string :name, null: false
      
      t.integer :course_id, null: false

      t.timestamps
    end
  end
end
