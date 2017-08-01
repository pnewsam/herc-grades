require 'smarter_csv'

class CsvParsingService

  include SmarterCsv

  def initialize(filename)
    @data = hashed_data(filename)
  end

  def create_students
    @data.map do |record|
      student_hash = prepare_student_hash(record)
      Student.new(student_hash)
    end
  end

private
  def hashed_data(filename)
    SmarterCSV.process(filename).shift(1)
  end

  def parse_name(student_hash, full_name)
    student = student_hash
    student[:first_name] = full_name.first
    student[:last_name] = full_name.last
    if full_name.length == 3
      student[:middle_name] = full_name.middle
    end
    return student
  end

  def prepare_student_hash(record)
    student = {}
    full_name = record[:student].split(/,[\s+]/).reverse
    student = parse_name(student, full_name)
    student[:id_number] = record[:sis_user_id]
    student[:password] = student[:id_number]
    student[:email] = "#{student[:id_number]}@example.com"
    return student
  end
end