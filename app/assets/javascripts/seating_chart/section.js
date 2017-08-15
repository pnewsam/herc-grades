$(document).on("turbolinks:load", function(){

  if (window.location.pathname.indexOf("sections") > 0) {
    var section = new Section() 
  }

});

var Section = function() {

  var seats, students, numRows, numCols, numSeats, seatingChart;
  seats = [];
  students = [];

  var seatingChartContainer, studentRosterContainer, assignmentListContainer, editButton;
  seatingChartContainer = $(".seating-chart");
  studentRosterContainer = $(".student-roster");
  assignmentListContainer = $(".assignment-list");
  editButton = $(seatingChartContainer.find(".seating-chart__edit-button"));
  
  isEditable = false;
  fetch();

  function fetch() {
    var action, that;
    action = window.location.pathname + '/seats';
    $.ajax({
      url: action,
      method: 'GET',
      dataType: 'json'
    })
    .done(function(r) {
      initSection(r.section);
      initStudents(r.students);
      initSeats(r.seats);
      bindEvents();
    });
  }

  function initSection(data) {
    numRows = data.number_of_rows;
    numCols = data.number_of_columns;
    numSeats = numRows * numCols;
  }

  function initStudents(data) { 
    for (let i = 0; i < data.length; i++) {
      s = new Student(data[i]);
      students.push(s);
    }
  }

  function initSeats(data) {
    var sNum, s;
    sNum = 0;
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        if (findSeat(data, sNum)) {
          let props = findSeat(data, sNum);
          props.student = findStudent(Number(props.student_id));
          s = new Seat(props);
        }
        else {
          let props = {id: null, student: new Student(), seat_number: sNum, row_number: r, column_number: c};
          s = new Seat(props);
        }
        seats.push(s)
        if (c !== numCols - 1) {
          sNum += 1;
        }
      }
      sNum += 1;
    }
  }

  function findStudent(id) {
    return(students.filter(function(s){ return s.id === id; })[0]);
  }

  function findSeat(seatsData, seatNum) {
    return(seatsData.filter(function(s){ return s.seat_number === seatNum; })[0]);
  }

  function renderSeatingChart(isEditable = false) {
    let props = {
      width: seatingChartContainer.width(),
      isEditable: isEditable,
      seats: seats,
      numRows: numRows,
      numCols: numCols,
      container: seatingChartContainer
    };
    seatingChart = new SeatingChart(props);
    seatingChart.render();
    console.log(seatingChart.height);
    seatingChartContainer.height(seatingChart.height);
  }

  function bindEvents() {
    editButton.on("click",function(){
      if (isEditable) { isEditable = false; }
      else { isEditable = true; }
      renderSeatingChart(isEditable);
    });

    $(window).resize(function(){
      seatingChartContainer.html("");
      renderSeatingChart(isEditable);
    });
  }

};

  // function toggleEditable() {
  //   if (isEditable && confirm("Are you sure? Your edits won't be saved.")) {
  //     isEditable = false;
  //     $assignmentList.removeClass("hide");
  //     studentRoster.aassignmentListhide");
  //     for (let i = 0; i < $seatNodes.length; i++) {
  //       $($seatNodes[i]).find(".seating-chart__remove-student").remove();
  //     }
  //     reseatStudents();
  //   }
  //   else {
  //     isEditable = true;
  //     $assignmentList.addClass("hide");
  //     studentRoster.rassignmentListhide");
  //     for (let i = 0; i < $seatNodes.length; i++) {
  //       $($seatNodes[i]).prepend(renderDelete());
  //     }
  //     bindDeletes();
  //   }


