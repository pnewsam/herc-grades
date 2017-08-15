var StudentRoster = function() {

  this.students;
  this.isEditable;

  function renderRoster() {
    for (let i = 0; i < students.length; i++) {
      $studentRoster.append(renderRosterName(students[i]));
    }
  }

  function render(student) {
    return(`
      <div id="roster-${student.id}" class="student-roster__record">
        <p class="student-roster__placeholder tag is-medium">
          ${responsiveStudentName(student,seatingChardWidth)}
        </p>
      </div>
    `);
  }

};