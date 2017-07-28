module DateHelper
  def current_year
    DateTime.now.year
  end
  def next_year
    DateTime.now.year + 1
  end
end