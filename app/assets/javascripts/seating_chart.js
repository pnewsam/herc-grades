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



class Section {

  constructor(seatingChart, studentRoster, assignmentList) {

    // Data
    this.section, this.students, this.seats;
    this.fetchData();

    // DOM Nodes
    this.seatingChart = seatingChart;
    this.editButton, this.seatNodes, this.studentNodes;
    this.assignmentList = assignmentList;
    this.studentRoster = studentRoster;
    this.collectNodes();
    this.bindEvents();

    
    
    // State
    this.isEditable = false;
    this.seatingChartWidth, this.seatSideLength;

  }

  fetchData() {
    var action, that;
    action = window.location.pathname + '/seats';
    that = this;
    $.ajax({
      url: action,
      method: 'GET',
      dataType: 'json'
    })
    .done(function(response) {
      that.assignModels(response);
      that.renderSeatingChart();
    });
  }

  collectNodes() {
    this.studentNodes = $(".seating-chart__student")
    this.seatNodes = $(".seating-chart__seat")
    this.editButton = this.seatingChart.find(".seating-chart__edit-button");
  }

  assignModels(response) {
    this.section = response.section;
    this.students = response.students;
    this.seats = response.seats;
  }

  bindEvents() {
    this.editButton.on("click", function(event){ toggleEditable(); });
  }

  updateSizing() {
    this.seatingChartWidth = this.seatingChart.width();
    this.seatSideLength = (this.seatingChartWidth / this.section.number_of_columns) - 10;
    this.seatingChart.height(this.seatSideLength * this.section.number_of_rows + this.section.number_of_rows * 15);
  }

  renderRoster() {
    for (let i = 0; i < this.students.length; i++) {
      this.studentRoster.append(this.renderRosterName(this.students[i]));
    }
  }

  toggleEditable() {
    if (this.isEditable) {
      this.assignmentList.addClass("hide");
      this.studentRoster.removeClass("hide");
    }
    else {
      this.assignmentList.addClass("hide");
      this.studentRoster.removeClass("hide");
    }
  };

  renderSeatingChart() {
    for (let i = 0; i < this.seats.length; i++) {
      let seat = this.seats[i];
      this.seatingChart.append(this.renderSeat(seat));
      this.translateSeat(seat,this.seatSideLength);
      this.findAndAppendStudent(seat);
    }
    this.resizeChart();
  }

  findAndAppendStudent(seat,context) {
    let student = this.students.filter(function(student) { return seat.student_id === student.id; })[0];
    $(`#seat-${seat.id}`).append(this.renderStudent(student));
  }

  resizeChart() {
    this.updateSizing();
    this.collectNodes();
    for (let i = 0; i < this.seatNodes.length; i++) {
      let seatNode = $(this.seatNodes[i]);
      let seat = this.seats[seatNode.attr("id").replace("seat-","") - 1]
      seatNode.css("width",`${this.seatSideLength}px`).css("height",`${this.seatSideLength}px`);
      this.translateSeat(seat,this.seatSideLength);
    }
    for (let j = 0; j < this.studentNodes.length; j++) {
      let studentNode = $(this.studentNodes[j]);
      studentNode.css("width",`${this.seatSideLength}px`).css("height",`${this.seatSideLength}px`)
    }
  }

  translateSeat(seat, seatSideLength) {
    let x = (seat.column_number * seatSideLength + seat.column_number * 10 + 5).toString() + 'px';
    let y = (seat.row_number * seatSideLength + seat.row_number * 10 + 5).toString() + 'px';
    $(`#seat-${seat.id}`).css("transform",`translateX(${x}) translateY(${y})`)
  }

  resizeEl(student) {
    $(`#student-${student.id}`).css("width",`${seatSideLength}px`).css("length",`${seatSideLength}px`)
  }

  // Render methods

  renderSeat(seat) {
    return (`
      <div id="seat-${seat.id}" class="seating-chart__seat">
      </div>
    `);
  };

  renderStudent(student) {
    return (`
      <p id="student-${student.id}" class="seating-chart__student">
        ${student.first_name}
      </p>
    `);
  }

  renderStudentRosterRecord(student) {
    return(`
      <div id="roster-${student.id}" class="student-roster__record">
        <p class="student-roster__placeholder tag is-medium">
          ${this.responsiveStudentName(student,this.seatingChardWidth)}
        </p>
      </div>
    `)
  }

  responsiveStudentName(student, seatingChartWidth) {
    if (seatingChartWidth < 550) { return ( student.first_name[0] ); }
    else { return ( student.first_name ); }
  }

  makeDroppable(el) {
    el.attr("ondrop","handleDrop(e)").attr("ondragover","handleDragover(e)");
  }

  makeDraggable(el) {
    el.attr("draggable","true").attr("ondragstart","handleDragstart(e)");
  }

  addDelete(el) {
    el.append(`
    <a class="seating-chart__remove-student delete"
    style="position:absolute;
    transform: translateX(${this.seatSide - 25}px) translateY(5px);">
    </a>"
    `)
  }

  handleDrop(e) {
    studentId = e.dataTransfer.originalEvent.getData("text")
    e.target.append($(`#${studentId}`));
  }

  handleDragover(e) {
    e.preventDefault();
  }

  handleDragstart(e) {
    e.preventDefault();
    e.dataTransfer.setData("text",e.target.id);
  }

}
