require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Teacher.create(email: "herc@email.com", password: "password")

Course.create(name: "Biology", teacher_id: 1)
Course.create(name: "Chemistry", teacher_id: 1)
Course.create(name: "Computer Science", teacher_id: 1)

sections = []
sections << Section.create(period: 1, academic_year_start: 2017, academic_year_end: 2018, semester: "Fall", course_id: 1)
sections << Section.create(period: 2, academic_year_start: 2017, academic_year_end: 2018, semester: "Fall", course_id: 1)
sections << Section.create(period: 3, academic_year_start: 2017, academic_year_end: 2018, semester: "Fall", course_id: 2)
sections << Section.create(period: 4, academic_year_start: 2017, academic_year_end: 2018, semester: "Fall", course_id: 3)

assignment_models = []
assignment_models << AssignmentModel.create(name: "Draw a Fossil", course_id: 1)
assignment_models << AssignmentModel.create(name: "Draw the Food Web", course_id: 1)
assignment_models << AssignmentModel.create(name: "Learn about your Favorite Animal", course_id: 1)
assignment_models << AssignmentModel.create(name: "Raise an Ant Farm", course_id: 1)
assignment_models << AssignmentModel.create(name: "Find 10 different Bugs", course_id: 1)

assignment_models << AssignmentModel.create(name: "Make your own Periodic Table", course_id: 2)
assignment_models << AssignmentModel.create(name: "Make a Volcano", course_id: 2)
assignment_models << AssignmentModel.create(name: "Learn about an Element", course_id: 2)
assignment_models << AssignmentModel.create(name: "What's in an Alloy?", course_id: 2)
assignment_models << AssignmentModel.create(name: "What's it Made Of?", course_id: 2)

assignment_models << AssignmentModel.create(name: "Learn an Algorithm", course_id: 3)
assignment_models << AssignmentModel.create(name: "Pseudocode Your Morning Routine", course_id: 3)
assignment_models << AssignmentModel.create(name: "Code a Racing Game", course_id: 3)
assignment_models << AssignmentModel.create(name: "Make a Motor", course_id: 3)
assignment_models << AssignmentModel.create(name: "Design a Program", course_id: 3)

students = []
80.times do
  students << Student.create(first_name: Faker::Name.first_name, middle_name: Faker::Name.first_name, last_name: Faker::Name.last_name)
end

k = 0

sections.each do |section|

  i = k + 1
  while i < k + 6
    Assignment.create(date_assigned: Date.today, date_due: Date.tomorrow, assignment_model_id: i, section_id: section.id)
    i += 1
  end
  k += 5

  seats = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].shuffle
  grades = ['A', 'B', 'C', 'D', 'F']
  20.times do
    student = students.pop
    SeatAssignment.create(student_id: student.id, section_id: section.id, seat_number: seats.pop)
    j = 1
    while j < 6
      AssignmentGrade.create(student_id: student.id, assignment_id: j, grade: grades.sample)
      j += 1
    end
  end

end