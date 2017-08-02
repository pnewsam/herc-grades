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

end
