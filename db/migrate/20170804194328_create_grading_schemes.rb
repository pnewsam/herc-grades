class CreateGradingSchemes < ActiveRecord::Migration[5.1]
  def change
    create_table :grading_schemes do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end
