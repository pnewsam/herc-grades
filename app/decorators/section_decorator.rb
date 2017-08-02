class SectionDecorator < ApplicationDecorator
  delegate_all

  # Define presentation-specific methods here. Helpers are accessed through
  # `helpers` (aka `h`). You can override attributes, for example:
  #
  #   def created_at
  #     helpers.content_tag :span, class: 'time' do
  #       object.created_at.strftime("%a %m/%d/%y")
  #     end
  #   end

  def grid
    object.number_of_rows * object.number_of_columns
  end

  def period_and_course_name
    object.period.to_s + ' - ' + object.course.name
  end

  def generate_seating_chart
    rows = []

    object.number_of_rows.times do |i|
      str = "<div class='seatrow' style='background-color: black; padding: 5px; display: flex; justify-content: space-around;'>"
      object.number_of_columns.times do |j|
        str += "<div class='seat' style='background-color: yellow; height: 50px; width: 50px;'></div>"
      end
      str += "</div>"
      rows << str
    end

    rows.join("").html_safe
  end

  def render_seats
    str = "<div class='room'>"
    object.seats.each do |seat|
      str += seat.render
    end
    p str.concat("</div>").html_safe
  end

end
