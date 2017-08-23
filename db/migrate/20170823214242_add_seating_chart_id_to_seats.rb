class AddSeatingChartIdToSeats < ActiveRecord::Migration[5.1]
  def change
    add_column :seats, :seating_chart_id, :integer
  end
end
