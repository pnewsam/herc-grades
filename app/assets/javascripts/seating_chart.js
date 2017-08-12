$(document).on("turbolinks:load", function(){

  if (window.location.pathname.indexOf("sections") > 0) {
    var section = new Section($(".seating-chart"), $(".student-roster"), $(".assignment-list"))
    $(window).resize(function(){
      section.resizeChart();
    });    
  }

});


var Section = function($seatingChart, $studentRoster, $assignmentList) {

    var section, students, seats, $editButton, $seatNodes, $studentNodes, seatingChartWidth, seatSideLength, isEditable;
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
      parseData(response);
      renderSeatingChart();
    });
  }

  function collectNodes() {
    $studentNodes = $(".seating-chart").find(".seating-chart__student");
    $seatNodes = $(".seating-chart__seat");
    $editButton = $seatingChart.parent().find(".seating-chart__edit-button");
  }

  function parseData(response) {
    section = response.section;
    students = response.students;
    seats = response.seats;
  }

  function bindEvents() {
    $editButton.on("click", function(event){ toggleEditable(); });
    // $(".student-roster").find(".seating-chart__student").on("dragstart",function(event){
    //   event.dataTransfer.originalEvent.setData("text",e.target.id);
    // }
    // $()
  }

  function updateSizing() {
    seatingChartWidth = $seatingChart.width();
    seatSideLength = (seatingChartWidth / section.number_of_columns) - 10;
    $seatingChart.height(seatSideLength * section.number_of_rows + section.number_of_rows * 15);
  }

  function renderRoster() {
    for (let i = 0; i < students.length; i++) {
      $studentRoster.append(renderRosterName(students[i]));
    }
  }

  function toggleEditable() {
    if (isEditable && confirm("Are you sure? Your edits won't be saved.")) {
      isEditable = false;
      $assignmentList.removeClass("hide");
      $studentRoster.addClass("hide");
      for (let i = 0; i < $seatNodes.length; i++) {
        $($seatNodes[i]).find(".seating-chart__remove-student").remove();
      }
      reseatStudents();
    }
    else {
      isEditable = true;
      $assignmentList.addClass("hide");
      $studentRoster.removeClass("hide");
      for (let i = 0; i < $seatNodes.length; i++) {
        $($seatNodes[i]).prepend(renderDelete());
      }
      bindDeletes();
    }
  };

  function renderSeatingChart() {
    for (let i = 0; i < seats.length; i++) {
      let seat = seats[i];
      $seatingChart.append(renderSeat(seat));
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
    for (let i = 0; i < $seatNodes.length; i++) {
      let seatNode = $($seatNodes[i]);
      let seat = findSeatByNode(seatNode);
      resizeEl(seatNode,seatSideLength);
      translateSeat(seat,seatSideLength);
    }
    for (let j = 0; j < $studentNodes.length; j++) {
      let studentNode = $($studentNodes[j]);
      let student = findStudentByNode(studentNode)
      studentNode.text(`${responsiveStudentName(student, seatingChartWidth)}`);
    }
  }

  function findSeatByNode(seatNode) {
    let seatId = Number(seatNode.attr("id").replace("seat-",""));
    let seat = seats.filter(function(seat){ return seat.id == seatId; })[0];
    return seat;
  }

  function findStudentByNode(studentNode) {
    let studentId = Number(studentNode.attr("id").replace("student-",""));
    let student = students.filter(function(student){ return student.id === studentId; })[0];
    return student;
  }

  function translateSeat(seat, seatSideLength) {
    let x = (seat.column_number * seatSideLength + seat.column_number * 10 + 5).toString() + 'px';
    let y = (seat.row_number * seatSideLength + seat.row_number * 10 + 5).toString() + 'px';
    $(`#seat-${seat.id}`).css("transform",`translateX(${x}) translateY(${y})`);
  }

  function resizeEl(el,seatSideLength) {
   el.css("width",`${seatSideLength}px`).css("height",`${seatSideLength}px`);
  }

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
    if (seatingChartWidth < 550) { return ( student.first_name.substr(0,3) + '.' ); }
    else { return ( student.first_name ); }
  }

  function renderDelete() {
    return (`<a class="seating-chart__remove-student delete"></a>`);
  }

  function bindDeletes() {
    $(".seating-chart").on("click", ".seating-chart__remove-student", function(e){
      let student = $(this).next().attr("style","");
      let seat = $(this).parent(".seating-chart__seat");
      makeDraggable(student);
      makeDroppable(seat);
      $($studentRoster).append(student);
      $(this).remove();
    });
  }

  function reseatStudents() {
    let unseatedStudents = $($studentRoster).find(".seating-chart__student");
    for (let i = 0; i < unseatedStudents.length; i++) {
      seatId = seats.filter(function(seat){ return seat.student_id == $(unseatedStudents[i]).attr("id").replace("student-",""); })[0].id;
      $(`#seat-${seatId}`).append($(unseatedStudents[i]));
    }
  }

  function makeDroppable(els) {
    els.on("drop",function(event){
      handleDrop(event);
    });
    els.on("dragover",function(event){
      handleDragover(event);
    })
  }

  function makeDraggable(els) {
    els.attr("draggable","true")
    els.on("dragstart",function(event){
      console.log(event)
      handleDragstart(event);
    });
  }
  
  function handleDragover(e) {
    e.preventDefault();
  }

  function handleDragstart(e) {
    e.originalEvent.dataTransfer.setData("text",e.target.id);
  }

  function handleDrop(e) {
    student = e.originalEvent.dataTransfer.getData("text")
    $(e.target).append($(`#${student}`)).prepend(`<a class="seating-chart__remove-student delete"></a>`);

  }

  return ({
    resizeChart: resizeChart
  });

};




