require 'faker'
require 'smarter_csv'

# Production
# ########################################
term = Term.create(name: 'Fall')
Term.create(name: 'Winter')
Term.create(name: 'Spring')
Term.create(name: 'Summer')

# # Development only:
# ########################################
teacher = Teacher.create(email: "herc@email.com", password: "password")
course = Course.create(name: "General Science")
section = Section.create(period: 1, academic_year_start: 2017, academic_year_end: 2018, term_id: term.id, course_id: course.id, teacher_id: teacher.id)

parser = CsvParsingService.new('db/student_info.csv', section)
parser.run