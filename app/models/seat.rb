class Seat < ApplicationRecord
  belongs_to :student
  belongs_to :seating_chart

  def render
    seat = "<div class='seat box is-paddingless has-text-centered'><p class='name'>#{self.student.first_name}<p></div>"
    if self.column_number == 0
      seat.prepend("<div class='row'>")
    end
    if self.column_number == self.section.number_of_columns - 1 || (self.column_number != self.section.number_of_columns - 1 && self.seat_number == self.section.number_of_seats - 1)
      seat.concat("</div>")
    end
    seat.html_safe
  end
end
