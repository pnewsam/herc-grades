class CreateSeatingCharts < ActiveRecord::Migration[5.1]
  def change
    create_table :seating_charts do |t|
      t.integer :number_of_rows, default: 5
      t.integer :number_of_columns, default: 6
      t.integer :section_id, null: false

    end
  end
end
