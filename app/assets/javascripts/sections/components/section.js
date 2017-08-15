var Section = function() {

  // Declare state variables
  var seats, students, numRows, numCols, numSeats, seatingChart, studentRoster, seatingChartEditor, isEditable;
  seats = [];
  students = [];
  isEditable = false;

  // Collect nodes
  var seatingChartContainer, studentRosterContainer, assignmentListContainer, editButton;
  seatingChartContainer = $(".seating-chart");
  studentRosterContainer = $(".student-roster");
  assignmentListContainer = $(".assignment-list").closest(".card-content");
  editButton = $(".seating-chart__edit-button");
  
  // Fetch data
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
      renderSeatingChart();
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
        if (c !== numCols - 1) { sNum += 1; }
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
    seatingChartContainer.html("")
    let props = {
      width: seatingChartContainer.width(),
      isEditable: isEditable,
      seats: seats,
      numRows: numRows,
      numCols: numCols,
      container: seatingChartContainer
    };
    seatingChart = new SeatingChart(props);
    seatingChartContainer.height(seatingChart.height);
    seatingChart.render(isEditable);
  }

  function initiateEdit() {
    if (typeof studentRoster !== "object") {
      let props = {container: studentRosterContainer, placeholders: students};
      studentRoster = new StudentRoster(props);
    }
    $(studentRosterContainer).removeClass("hide");
    $(assignmentListContainer).addClass("hide");
    studentRoster.render();
  }

  function terminateEdit() {
    $(studentRosterContainer).addClass("hide")
    $(assignmentListContainer).removeClass("hide");
  }

  function bindEvents() {
    editButton.on("click", function(){
      if (isEditable) {
        isEditable = false;
        terminateEdit();
      }
      else {
        isEditable = true;
        initiateEdit();
      }
      renderSeatingChart(isEditable);
    });

    $(window).resize(function(){
      seatingChartContainer.html("");
      renderSeatingChart(isEditable);
    });
  }

};