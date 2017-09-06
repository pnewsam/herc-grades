class RemoveSectionIdFromSeats < ActiveRecord::Migration[5.1]
  def change
    remove_column :seats, :section_id, :integer
  end
end
