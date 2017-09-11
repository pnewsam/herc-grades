class RemoveNumberOfSeatsFromSections < ActiveRecord::Migration[5.1]
  def change
    remove_column :sections, :number_of_seats, :integer
  end
end
