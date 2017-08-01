class AddSeatingChartToSections < ActiveRecord::Migration[5.1]
  def change
    change_table :sections do |t|
      t.integer :number_of_seats, default: 30
      t.integer :number_of_rows, default: 5
      t.integer :number_of_columns, default: 6
    end
  end
end