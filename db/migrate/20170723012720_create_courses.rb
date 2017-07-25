class CreateCourses < ActiveRecord::Migration[5.1]
  def change
    create_table :courses do |t|
      t.string :name, null: false 
      
      t.integer :teacher_id, null: false

      t.timestamps
    end
  end
end