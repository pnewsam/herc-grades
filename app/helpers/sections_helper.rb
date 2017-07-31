module SectionsHelper

  def current_section
    Section.find(params[:section_id])
  end
end