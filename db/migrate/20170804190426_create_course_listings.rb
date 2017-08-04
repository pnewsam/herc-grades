class CreateCourseListings < ActiveRecord::Migration[5.1]
  def change
    create_table :course_listings do |t|
      t.integer :school_id, null: false
      t.integer :course_id, null: false

      t.timestamps
    end
  end
end
