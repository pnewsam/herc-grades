export const SET_STUDENTS = 'SET_STUDENTS'

export function setStudents(students) {
  return {
    type: SET_STUDENTS,
    students: students
  };
};