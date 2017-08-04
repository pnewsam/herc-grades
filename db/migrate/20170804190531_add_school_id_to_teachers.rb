class AddSchoolIdToTeachers < ActiveRecord::Migration[5.1]
  def change
    change_table :teachers do |t|
      t.integer :school_id, null: false, default: 1
    end
  end
end
