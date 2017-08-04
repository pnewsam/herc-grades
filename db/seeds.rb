require 'faker'
require 'smarter_csv'

# Production
# ########################################
fall = Term.create(name: 'Fall')
Term.create(name: 'Winter')
Term.create(name: 'Spring')
Term.create(name: 'Summer')

School.create(name: 'No School')
chula_vista = School.create(name: 'Chula Vista Middle School')

# # Development only:
# ########################################
herc = Teacher.create(email: "herc@email.com", password: "password", school_id: chula_vista.id)

gensci = Course.create(name: "General Science")
gensci_accel = Course.create(name: "General Science Accelerated")
compsci = Course.create(name: "Computer Science")

period1 = Section.create(period: 1, academic_year_start: 2017, academic_year_end: 2018, term_id: fall.id, course_id: gensci.id, teacher_id: herc.id)
parser_p1 = CsvParsingService.new('db/period_1.csv', period1)
puts "Period 1 parse intialized!"
parser_p1.run
puts "Period 1 done!"

period4 = Section.create(period: 4, academic_year_start: 2017, academic_year_end: 2018, term_id: fall.id, course_id: gensci_accel.id, teacher_id: herc.id)
parser_p4 = CsvParsingService.new('db/period_4.csv', period4)
puts "Period 4 parse intialized!"
parser_p4.run
puts "Period 4 done!"

period5 = Section.create(period: 5, academic_year_start: 2017, academic_year_end: 2018, term_id: fall.id, course_id: gensci.id, teacher_id: herc.id)
parser_p5 = CsvParsingService.new('db/period_5.csv', period5)
puts "Period 5 parse intialized!"
parser_p5.run
puts "Period 5 done!"

period6 = Section.create(period: 6, academic_year_start: 2017, academic_year_end: 2018, term_id: fall.id, course_id: compsci.id, teacher_id: herc.id)
parser_p6 = CsvParsingService.new('db/period_6.csv', period6)
puts "Period 6 parse intialized!"
parser_p6.run
puts "Period 6 done!"