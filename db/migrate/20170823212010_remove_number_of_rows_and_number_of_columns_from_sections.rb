class RemoveNumberOfRowsAndNumberOfColumnsFromSections < ActiveRecord::Migration[5.1]
  def change
    remove_column :sections, :number_of_rows, :integer
    remove_column :sections, :number_of_columns, :integer
  end
end