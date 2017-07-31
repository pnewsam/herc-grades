require 'smarter_csv'

all_data = SmarterCSV.process('db/student_info.csv')

# all_data = SmarterCSV.process('db/student_info.csv',
# {:remove_unmapped_keys => true, :skip_lines  => 1,
# :key_mapping => { :last_name => :student, :id_number => :sis_user_id}
# })

# Note: we are ignoring the first index because it's a header row. To-Do: remove headers.
all_data.shift(1)

def student_hash_prep(student_hash_item)
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
end

all_data.map { |student_hash| student_hash_prep(student_hash)}
