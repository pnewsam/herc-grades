class AssignmentDecorator < ApplicationDecorator
  delegate_all

  # Define presentation-specific methods here. Helpers are accessed through
  # `helpers` (aka `h`). You can override attributes, for example:
  #
  #   def created_at
  #     helpers.content_tag :span, class: 'time' do
  #       object.created_at.strftime("%a %m/%d/%y")
  #     end
  #   end

  def status_tag
    if object.fully_graded?
      "<span class='tag is-success'>Graded</span>".html_safe
    elsif object.partially_graded?
      "<span class='tag is-warning'>Partially Graded</span>".html_safe
    else
      "<span class='tag is-danger'>Ungraded</span>".html_safe
    end
  end

  def status_tag_large
    if object.fully_graded?
      "<span class='tag is-success is-large'>Graded</span>".html_safe
    elsif object.partially_graded?
      "<span class='tag is-warning is-large'>Partially Graded</span>".html_safe
    else
      "<span class='tag is-danger is-large'>Ungraded</span>".html_safe
    end
  end

end
