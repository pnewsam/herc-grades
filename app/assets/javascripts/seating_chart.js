// BEM
// B .seating-chart
// E .seating-chart__seat
// E .seating-chart__student
// E .seating-chart__remove-student
// E .seating-chart__edit-button

// B .student-roster
// E .student-roster__record
// E .student-roster__placeholder
// E .student-roster__student

// B .assignment-list


// fetchData()
// assignComponents()
// renderSeats()
// bindEvents()

// seatStudents()
// resizeChart()
// toggleEditable()
// swapSidePanel()
// addDeleteToSeatedStudents()

// makeDroppable()
// makeDraggable()
// handleDrop()
// handleDragover()

$(document).on("turbolinks:load", function(){

  if (window.location.pathname.indexOf("sections") > 0) {

    var section = new Section($(".seating-chart"), $(".student-roster"), $(".assignment-list"))
    
    $(window).resize(function(){
      section.resizeChart();
    });
    
  }

});


var Section = function(seatingChart, studentRoster, assignmentList) {

    var section, students, seats, editButton, seatNodes, studentNodes, seatingChartWidth, seatSideLength, isEditable;
    isEditable = false;
    fetchData();
    collectNodes();
    bindEvents();

  function fetchData() {
    var action, that;
    action = window.location.pathname + '/seats';
    // that = this;
    $.ajax({
      url: action,
      method: 'GET',
      dataType: 'json'
    })
    .done(function(response) {
      assignModels(response);
      renderSeatingChart();
    });
  }

  function collectNodes() {
    studentNodes = $(".seating-chart__student")
    seatNodes = $(".seating-chart__seat")
    editButton = seatingChart.find(".seating-chart__edit-button");
  }

  function assignModels(response) {
    section = response.section;
    students = response.students;
    seats = response.seats;
  }

  function bindEvents() {
    editButton.on("click", function(event){ toggleEditable(); });
  }

  function updateSizing() {
    seatingChartWidth = seatingChart.width();
    seatSideLength = (seatingChartWidth / section.number_of_columns) - 10;
    seatingChart.height(seatSideLength * section.number_of_rows + section.number_of_rows * 15);
  }

  function renderRoster() {
  for (let i = 0; i < students.length; i++) {
      studentRoster.append(renderRosterName(students[i]));
    }
  }

  function toggleEditable() {
    if (isEditable) {
      assignmentList.addClass("hide");
      studentRoster.removeClass("hide");
    }
    else {
      assignmentList.addClass("hide");
      studentRoster.removeClass("hide");
    }
  };

  function renderSeatingChart() {
    for (let i = 0; i < seats.length; i++) {
      let seat = seats[i];
      seatingChart.append(renderSeat(seat));
      translateSeat(seat, seatSideLength);
      findAndAppendStudent(seat);
    }
    resizeChart();
  }

  function findAndAppendStudent(seat,context) {
    let student = students.filter(function(student) { return seat.student_id === student.id; })[0];
    $(`#seat-${seat.id}`).append(renderStudent(student));
  }

  function resizeChart() {
    updateSizing();
    collectNodes();
    for (let i = 0; i < seatNodes.length; i++) {
      let seatNode = $(seatNodes[i]);
      let seat = seats[seatNode.attr("id").replace("seat-","") - 1];
      resizeEl(seatNode,seatSideLength);
      translateSeat(seat,seatSideLength);
    }
    for (let j = 0; j < studentNodes.length; j++) {
      let studentNode = $(studentNodes[j]);
      resizeEl(studentNode,seatSideLength);
    }
  }

  function translateSeat(seat, seatSideLength) {
    let x = (seat.column_number * seatSideLength + seat.column_number * 10 + 5).toString() + 'px';
    let y = (seat.row_number * seatSideLength + seat.row_number * 10 + 5).toString() + 'px';
    $(`#seat-${seat.id}`).css("transform",`translateX(${x}) translateY(${y})`);
  }

  function resizeEl(el,seatSideLength) {
   el.css("width",`${seatSideLength}px`).css("height",`${seatSideLength}px`);
  }

  // Render methods

  function renderSeat(seat) {
    return (`
      <div id="seat-${seat.id}" class="seating-chart__seat">
      </div>
    `);
  }

  function renderStudent(student) {
    return (`
      <p id="student-${student.id}" class="seating-chart__student">
        ${student.first_name}
      </p>
    `);
  }

  function renderStudentRosterRecord(student) {
    return(`
      <div id="roster-${student.id}" class="student-roster__record">
        <p class="student-roster__placeholder tag is-medium">
          ${responsiveStudentName(student,seatingChardWidth)}
        </p>
      </div>
    `);
  }

  function responsiveStudentName(student, seatingChartWidth) {
    if (seatingChartWidth < 550) { return ( student.first_name[0] ); }
    else { return ( student.first_name ); }
  }

  function makeDroppable(el) {
    el.attr("ondrop","handleDrop(e)").attr("ondragover","handleDragover(e)");
  }

  function makeDraggable(el) {
    el.attr("draggable","true").attr("ondragstart","handleDragstart(e)");
  }

  function addDelete(el) {
    el.append(`
    <a class="seating-chart__remove-student delete"
    style="position:absolute;
    transform: translateX(${seatSide - 25}px) translateY(5px);">
    </a>"
    `);
  }

  function handleDrop(e) {
    studentId = e.dataTransfer.originalEvent.getData("text")
    e.target.append($(`#${studentId}`));
  }

  function handleDragover(e) {
    e.preventDefault();
  }

  function handleDragstart(e) {
    e.preventDefault();
    e.dataTransfer.setData("text",e.target.id);
  }

  return ({
    resizeChart: resizeChart
  });

};
