require 'smarter_csv'

all_data = SmarterCSV.process('db/student_info.csv')

# all_data = SmarterCSV.process('db/student_info.csv',
# {:remove_unmapped_keys => true, :skip_lines  => 1,
# :key_mapping => { :last_name => :student, :id_number => :sis_user_id}
# })

# Note: we are ignoring the first index because it's a header row. To-Do: remove headers.

# Test case for one student:
mary = all_data[1]

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
mary[:email] = "TBD@example.com"
mary.delete :student
mary.delete :id
mary.delete :sis_user_id
mary.delete :sis_login_id
mary.delete :section
mary.delete :"homework/classwork_final_score"
mary.delete :"labs,_projects,_quizzes_and_exams._final_score"
mary.delete :final_score

# if mary[:student].split(',').length == 2
#   mary[:first_name] = mary[:student].split(',')[1].strip.capitalize
#   mary[:last_name] = mary[:student].split(',')[0].strip.capitalize
#   mary[:middle_name] = "NA";
# else
#   mary[:first_name] = mary[:student].split(',')[1].strip.capitalize
#   mary[:last_name] = mary[:student].split(',')[0].strip.capitalize
#     mary[:middle_name] = "NA";
# end
