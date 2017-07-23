class CreateTeachers < ActiveRecord::Migration[5.1]
  def change
    create_table :teachers do |t|
      t.string :email, null: false
      t.string :password_hash, null: false

      t.timestamps
    end
  end
end