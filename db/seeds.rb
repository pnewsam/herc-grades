require 'faker'
require 'smarter_csv'

# Production
# ########################################
fall = Term.create(name: 'Fall')
Term.create(name: 'Winter')
Term.create(name: 'Spring')
Term.create(name: 'Summer')

# # Development only:
# ########################################
herc = Teacher.create(email: "herc@email.com", password: "password")

gensci = Course.create(name: "General Science")
gensci_accel = Course.create(name: "General Science Accelerated")
compsci = Course.create(name: "Computer Science")

period1 = Section.create(period: 1, academic_year_start: 2017, academic_year_end: 2018, term_id: fall.id, course_id: gensci.id, teacher_id: herc.id)
parser_p1 = CsvParsingService.new('db/period_1.csv', period1)
parser_p1.run

period4 = Section.create(period: 4, academic_year_start: 2017, academic_year_end: 2018, term_id: fall.id, course_id: gensci_accel.id, teacher_id: herc.id)
parser_p4 = CsvParsingService.new('db/period_4.csv', period4)
parser_p4.run

period5 = Section.create(period: 5, academic_year_start: 2017, academic_year_end: 2018, term_id: fall.id, course_id: gensci.id, teacher_id: herc.id)
parser_p5 = CsvParsingService.new('db/period_5.csv', period5)
parser_p5.run

period6 = Section.create(period: 6, academic_year_start: 2017, academic_year_end: 2018, term_id: fall.id, course_id: compsci.id, teacher_id: herc.id)
parser_p6 =CsvParsingService.new('db/period_6.csv', period6)
parser_p6.run