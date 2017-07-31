require 'faker'
require 'smarter_csv'

# Production and Development
# ########################################
Term.create(name: 'Fall')
Term.create(name: 'Winter')
Term.create(name: 'Spring')
Term.create(name: 'Summer')
#
#
# # Development only:
# ########################################
Teacher.create(email: "herc@email.com", password: "password")

# course = Course.create(name: "Biology",)
# Course.create(name: "Chemistry")
# Course.create(name: "Computer Science")
#
# sections = []
# sections << Section.create(period: 1, academic_year_start: 2017, academic_year_end: 2018, term_id: 1, course_id: 1, teacher_id: 1)
# sections << Section.create(period: 2, academic_year_start: 2017, academic_year_end: 2018, term_id: 1, course_id: 1, teacher_id: 1)
# sections << Section.create(period: 3, academic_year_start: 2017, academic_year_end: 2018, term_id: 1, course_id: 2, teacher_id: 1)
# sections << Section.create(period: 4, academic_year_start: 2017, academic_year_end: 2018, term_id: 1, course_id: 3, teacher_id: 1)
#
# students = []
# 20.times do
#   first_name = Faker::Name.first_name
#   last_name = Faker::Name.last_name
#   email = Faker::Internet.safe_email
#   password = 'password'
#   students << Student.create(first_name: first_name, last_name: last_name, email: email, password: password)
# end
#
# k = 1
# students.each do |student|
#   Seat.create(section_id: 1, student_id: student.id, seat_number: k)
#   k += 1
# end

# sections.each do |section|

#   if section.course.id == 1
#     Assignment.create(name: "Draw a Fossil", course_id: 1, date_assigned: Date.today, date_due: Date.tomorrow, section_id: section.id)
#     Assignment.create(name: "Draw the Food Web", course_id: 1, date_assigned: Date.today, date_due: Date.tomorrow, section_id: section.id)
#     Assignment.create(name: "Learn about your Favorite Animal", course_id: 1, date_assigned: Date.today, date_due: Date.tomorrow, section_id: section.id)
#     Assignment.create(name: "Raise an Ant Farm", course_id: 1, date_assigned: Date.today, date_due: Date.tomorrow, section_id: section.id)
#     Assignment.create(name: "Find 10 different Bugs", course_id: 1, date_assigned: Date.today, date_due: Date.tomorrow, section_id: section.id)
#   elsif section.course.id == 2
#     Assignment.create(name: "Make your own Periodic Table", course_id: 2, date_assigned: Date.today, date_due: Date.tomorrow, section_id: section.id)
#     Assignment.create(name: "Make a Volcano", course_id: 2, date_assigned: Date.today, date_due: Date.tomorrow, section_id: section.id)
#     Assignment.create(name: "Learn about an Element", course_id: 2, date_assigned: Date.today, date_due: Date.tomorrow, section_id: section.id)
#     Assignment.create(name: "What's in an Alloy?", course_id: 2, date_assigned: Date.today, date_due: Date.tomorrow, section_id: section.id)
#     Assignment.create(name: "What's it Made Of?", course_id: 2, date_assigned: Date.today, date_due: Date.tomorrow, section_id: section.id)
#   elsif section.course.id == 3
#     Assignment.create(name: "Learn an Algorithm", course_id: 3, date_assigned: Date.today, date_due: Date.tomorrow, section_id: section.id)
#     Assignment.create(name: "Pseudocode Your Morning Routine", course_id: 3, date_assigned: Date.today, date_due: Date.tomorrow, section_id: section.id)
#     Assignment.create(name: "Code a Racing Game", course_id: 3, date_assigned: Date.today, date_due: Date.tomorrow, section_id: section.id)
#     Assignment.create(name: "Make a Motor", course_id: 3, date_assigned: Date.today, date_due: Date.tomorrow, section_id: section.id)
#     Assignment.create(name: "Design a Program", course_id: 3, date_assigned: Date.today, date_due: Date.tomorrow, section_id: section.id)
#   end

#   seats = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].shuffle
#   grades = ['A', 'B', 'C', 'D', 'F']
#   20.times do
#     student = students.pop
#     Seat.create(student_id: student.id, section_id: section.id, seat_number: seats.pop)
#     j = 1
#     while j < 6
#       Grade.create(student_id: student.id, assignment_id: j, grade: grades.sample)
#       j += 1
#     end
#   end

# Importing demonstration data from CSV! (student_info.csv);
all_data = SmarterCSV.process('db/student_info.csv')

# all_data = SmarterCSV.process('db/student_info.csv',
# {:remove_unmapped_keys => true, :skip_lines  => 1,
# :key_mapping => { :last_name => :student, :id_number => :sis_user_id}
# })

# Note: we are ignoring the first index because it's a header row. To-Do: remove headers.
all_data.shift(1)

def create_section(course_id)
  Section.create(teacher_id: 1, period: 1, academic_year_start: DateTime.now.year, academic_year_end: (DateTime.now.year + 1), course_id: course_id, term_id: 1)
end

course = Course.create(name: all_data.first[:section])
section = create_section(course.id)

def student_hash_prep(student_hash_item, section_id, seat_number)
  mary = student_hash_item

  # Checking for last name, whether one or more names:
  mary[:last_name] = mary[:student].split(' ')[0].split(',')[0].capitalize

  # Checking for first name, and splitting into first and middle thereafter:
  mary[:first_name] = mary[:student].split(' ')[1].split(',')[0].capitalize

  if mary[:student].split(' ')[1].split(',')[1]
    mary[:middle_name] = mary[:student].split(' ')[1].split(',')[1]
  else
    mary[:middle_name] = nil
  end

  # Continuing to clean the data:
  mary[:id_number] = mary[:sis_user_id]
  mary.delete :student
  mary.delete :id
  mary.delete :sis_user_id
  mary.delete :sis_login_id
  mary.delete :section
  mary.delete :"homework/classwork_final_score"
  mary.delete :"labs,_projects,_quizzes_and_exams._final_score"
  mary.delete :final_score
  mary[:password] = mary[:id_number] # Note: May need to be changed by user.
  mary[:email] = "#{mary[:id_number]}@example.com" # Note: Dummy data. We need not null for the database.

  temp = Student.new(mary)

  if temp.save
    puts "Success! for #{mary[:last_name]}"
  end

  Seat.create(student_id: temp.id, section_id: section_id, seat_number: seat_number)
end

i = 0
all_data.map do |student_hash|
  student_hash_prep(student_hash, section.id, i)
  i = i + 1
end



# end
