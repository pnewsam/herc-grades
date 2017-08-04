class AddGradingSchemeIdToAssignments < ActiveRecord::Migration[5.1]
  def change
    add_column :assignments, :grading_scheme_id, :integer
  end
end
