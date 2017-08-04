require 'faker'
require 'smarter_csv'

# Production
# ########################################
fall = Term.create(name: 'Fall')
Term.create(name: 'Winter')
Term.create(name: 'Spring')
Term.create(name: 'Summer')

School.create(name: 'No School')

fpn = GradingScheme.create(name: 'Full / Partial / No Credit')
cn = GradingScheme.create(name: 'Credit / No Credit')
lg = GradingScheme.create(name: 'Letter Grade')
lgplus = GradingScheme.create(name: 'Letter Grade with +-')
percentage = GradingScheme.create(name: 'Percentage')

GradeValue.create(name: 'Ungraded', grading_scheme_id: fpn.id)
GradeValue.create(name: 'Full Credit', grading_scheme_id: fpn.id)
GradeValue.create(name: 'Partial Credit', grading_scheme_id: fpn.id)
GradeValue.create(name: 'No Credit', grading_scheme_id: fpn.id)

GradeValue.create(name: 'Ungraded', grading_scheme_id: cn.id)
GradeValue.create(name: 'Credit', grading_scheme_id: cn.id)
GradeValue.create(name: 'No Credit', grading_scheme_id: cn.id)

GradeValue.create(name: 'Ungraded', grading_scheme_id: lg.id)
GradeValue.create(name: 'A', grading_scheme_id: lg.id)
GradeValue.create(name: 'B', grading_scheme_id: lg.id)
GradeValue.create(name: 'C', grading_scheme_id: lg.id)
GradeValue.create(name: 'D', grading_scheme_id: lg.id)
GradeValue.create(name: 'F', grading_scheme_id: lg.id)

GradeValue.create(name: 'Ungraded', grading_scheme_id: lgplus.id)
GradeValue.create(name: 'A+', grading_scheme_id: lgplus.id)
GradeValue.create(name: 'A', grading_scheme_id: lgplus.id)
GradeValue.create(name: 'A-', grading_scheme_id: lgplus.id)
GradeValue.create(name: 'B+', grading_scheme_id: lgplus.id)
GradeValue.create(name: 'B', grading_scheme_id: lgplus.id)
GradeValue.create(name: 'B-', grading_scheme_id: lgplus.id)
GradeValue.create(name: 'C+', grading_scheme_id: lgplus.id)
GradeValue.create(name: 'C', grading_scheme_id: lgplus.id)
GradeValue.create(name: 'C-', grading_scheme_id: lgplus.id)
GradeValue.create(name: 'D+', grading_scheme_id: lgplus.id)
GradeValue.create(name: 'D', grading_scheme_id: lgplus.id)
GradeValue.create(name: 'D-', grading_scheme_id: lgplus.id)
GradeValue.create(name: 'F', grading_scheme_id: lgplus.id)

GradeValue.create(name: 'Ungraded', grading_scheme_id: percentage.id)
101.times do |i|
  GradeValue.create(name: i.to_s, value: i, grading_scheme_id: percentage.id)
end

# # Development only:
# ########################################
chula_vista = School.create(name: 'Chula Vista Middle School')
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