class AddSeatingChartCoordinatesToSeats < ActiveRecord::Migration[5.1]
  def change
    change_table :seats do |t|
      t.integer :row_number
      t.integer :column_number
    end
  end
end