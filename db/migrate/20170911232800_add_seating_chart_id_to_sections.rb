class AddSeatingChartIdToSections < ActiveRecord::Migration[5.1]
  def change
    add_column :sections, :seating_chart_id, :integer
  end
end
