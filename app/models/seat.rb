class Seat < ApplicationRecord
  belongs_to :student
  belongs_to :section

  def render
    seat = "<div class='seat box is-paddingless has-text-centered'><span>#{self.student.full_name}</span></div>"

    if self.column_number == 0
      seat.prepend("<div class='row'>")
    end

    if self.column_number == self.section.number_of_columns - 1 || self.seat_number == self.section.number_of_seats - 1
      seat.concat("</div>")
    end

    seat.html_safe
  end
end
