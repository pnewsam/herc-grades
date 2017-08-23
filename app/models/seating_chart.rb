class SeatingChart < ApplicationRecord
  belongs_to :section
  has_many :seats, -> { order(:id) }
  
  accepts_nested_attributes_for :seats
end
