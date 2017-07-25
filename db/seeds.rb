# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Teacher.create(email: "herc@email.com", password: "password")
Course.create(name: "Biology", teacher_id: 1)
Section.create(period: 1, academic_year_start: 2017, academic_year_end: 2018, semester: "Fall", course_id: 1)
AssignmentModel.create(name: "Invent an Animal", course_id: 1)
Assignment.create(date_assigned: Date.today, date_due: Date.tomorrow, assignment_model_id: 1, section_id: 1)
Student.create(first_name: 'Bobby', middle_name: 'Jimmy', last_name: 'Henry')
SeatAssignment.create(seat_number: 1, section_id: 1, student_id: 1)
AssignmentGrade.create(student_id: 1, assignment_id: 1, grade: 'A')