require 'smarter_csv'

class CsvParsingService

  include SmarterCSV

  def initialize(filename, section)
    @data = process_data(filename)
    @section = section
    @students = []
  end

  def run
    create_students
    create_seats
  end

private
  def process_data(filename)
    data = SmarterCSV.process(filename)
    data.shift(1)
    data
  end

  # Below: Student Creation
  def create_students
    @data.map do |record|
      student_hash = prepare_student_hash(record)
      s = Student.create(student_hash)
      puts "Created #{s.first_name} #{s.last_name}"
      @students << s
    end
  end

  def prepare_student_hash(record)
    student = {}
    full_name = record[:student].split(/[\s+]/).map{|n|n.capitalize}.join(' ').split(/,[\s+]/).reverse
    student = parse_name(student, full_name)
    student[:id_number] = record[:sis_user_id]
    student[:password] = student[:id_number]
    student[:email] = "#{student[:id_number]}@example.com"
    return student
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

  # Below: Seat Creation
  def create_seats
    update_section_seating
    seats = initialize_seats
    seat_students(seats)
  end

  def initialize_seats
    seats = []
    count = 0
    @section.number_of_rows.times do |i|
      @section.number_of_columns.times do |j|
        break if count == @section.number_of_seats
        seats << Seat.create(row_number: i, column_number: j, section_id: @section.id, student_id: 1, seat_number: 1)
        count += 1
      end
    end
    return seats
  end

  def seat_students(seats)
    @students.each_with_index do |student, idx|
      seats[idx].update(student_id: student.id, seat_number: idx)
    end
  end

  def update_section_seating
    number_of_seats = @students.length
    @section.update(number_of_seats: number_of_seats)
    case
    when number_of_seats.between?(16,20)
      @section.update(number_of_rows: 4, number_of_columns: 5)
    when number_of_seats.between?(21,24)
      @section.update(number_of_rows: 4, number_of_columns: 6)
    when number_of_seats.between?(25,30)
      @section.update(number_of_rows: 5, number_of_columns: 6)
    when number_of_seats.between?(31,35)
      @section.update(number_of_rows: 5, number_of_columns: 7)
    when number_of_seats.between?(36,42)
      @section.update(number_of_rows: 6, number_of_columns: 7)
    end
  end
end