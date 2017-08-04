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
  
  def period_and_course_name
    object.course.name + ' Period ' + object.period.to_s
  end

  def render_seats
    str = "<div class='room'>"
    object.seats.each do |seat|
      str += seat.render
    end
    str.concat("</div>").html_safe
  end
end
