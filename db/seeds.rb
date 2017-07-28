require 'faker'

# Production and Development
########################################
Term.create(name: 'Fall')
Term.create(name: 'Winter')
Term.create(name: 'Spring')
Term.create(name: 'Summer')


# Development only:
########################################
Teacher.create(email: "herc@email.com", password: "password")

course = Course.create(name: "Biology",)
Course.create(name: "Chemistry")
Course.create(name: "Computer Science")

sections = []
sections << Section.create(period: 1, academic_year_start: 2017, academic_year_end: 2018, semester: "Fall", course_id: 1, teacher_id: 1)
sections << Section.create(period: 2, academic_year_start: 2017, academic_year_end: 2018, semester: "Fall", course_id: 1, teacher_id: 1)
sections << Section.create(period: 3, academic_year_start: 2017, academic_year_end: 2018, semester: "Fall", course_id: 2, teacher_id: 1)
sections << Section.create(period: 4, academic_year_start: 2017, academic_year_end: 2018, semester: "Fall", course_id: 3, teacher_id: 1)

students = []
20.times do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name
  email = Faker::Internet.safe_email
  password = 'password'
  students << Student.create(first_name: first_name, last_name: last_name, email: email, password: password)
end

k = 1
students.each do |student|
  Seat.create(section_id: 1, student_id: student.id, seat_number: k)
  k += 1
end

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

# end

