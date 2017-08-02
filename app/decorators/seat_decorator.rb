class SeatDecorator < ApplicationDecorator
  delegate_all

  # Define presentation-specific methods here. Helpers are accessed through
  # `helpers` (aka `h`). You can override attributes, for example:
  #
  #   def created_at
  #     helpers.content_tag :span, class: 'time' do
  #       object.created_at.strftime("%a %m/%d/%y")
  #     end
  #   end

    def render
      seat = <<-SEAT
      <div class='box is-paddingless is-square'>
        <span>#{object.student.full_name}</span>
      </div>
      SEAT

      if seat.row_number == 0 
        seat.prepend("<div class='row'>")
      end

      if seat.row_number == seat.section.number_of_rows
        seat.concat("</div>")
      end

      seat.html_safe
    end

end
