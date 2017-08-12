// BEM
// B .seating-chart
// E .seating-chart__seat
// E .seating-chart__student
// E .seating-chart__remove-student
// E .seating-chart__edit-button

// B .student-roster
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

    var section = new Section($(".seating-chart_container"), $("student-roster"))
    $(window).resize(function(){
      section.renderSeats();
    });
    
    $(".seating-chart_container").on("click",".seating-chart__delete",function(event){
      rosterStudent.find('student-roster-name').show().attr("draggable","true").attr("ondragstart","dragstartHandler(event)");
      rosterStudent.find('student-roster-placeholder').hide();
      seat.empty();
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
    this.editButton;
    this.assignComponents();
    this.bindEvents();

    this.assignmentList = assignmentList;
    this.studentRoster = studentRoster;
    
    // Properties
    this.containerWidth, this.seatSide;
    
    // State
    this.isEditable = false;
  
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
      assignModels(response);
      if (response.seats.length > 0) {
        that.renderSeats();
        that.renderStudentRoster();
      }
    });
  }

  assignModels(response) {
    that.section = response.section;
    that.students = response.students;
    that.seats = response.seats;
  }

  assignComponents() {
    this.editButton = this.seatingChart.find(".seating-chart__edit-button");

  }

  bindEvents() {
    this.editButton.on("click", function(event){ toggleEditable(); });
  }

  updateSizing() {
    let cW = this.container.width();
    let sS = (cW / this.section.number_of_columns) - 10;
    this.containerWidth = cW;
    this.seatSide = sS;
    this.seatingChart.height(sS * this.section.number_of_rows + this.section.number_of_rows * 10 + 5);
  }

  renderSeats() {
    this.seatingChart.empty();
    this.updateSizing();
    for (let i = 0; i < this.seats.length; i++) {
      let seat = this.seats[i];
      let student;
      if (this.containerWidth < 550) {
        findStudentBySeat(student.id).first_name[0];
      }
      else {
        findStudentBySeat(student.id).first_name;
      }
      this.seatingChart.append(this.renderSeat(seat, student));
    };
  }

  findStudentBySeat(seat) {
    return (this.students.filter(function(student) {
      return seat.student_id === student.id;
    })[0]);
  }

  get

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
    loopElsWithCallback(this.seats,this.appendStudent)
  }
  
  renderSeat(seat,student) {
    let studentName;
    if (this.containerWidth < 550) { }
    else { studentName = student.first_name };
  }

  translateSeat(seat, seatSide) {
    let x = (seat.column_number * seatSide + seat.column_number * 10 + 5).toString() + 'px';
    let y = (seat.row_number * seatSide + seat.row_number * 10 + 5).toString() + 'px';
    seat.css("transform",`translateX(${x}) translateY(${y})`)
  }



  // Render methods

  renderSeatingChartSeat(seat) {
    return (`
      <div id="seat-${seat.id}" class="seating-chart__seat">
      </div>
    `);
  };

  renderSeatingChartStudent(student) {
    return (`
      <p id="student-${student.id}" class="seating-chart__student">
      ${student.name}
      </p>
    `);
  }

  renderStudentRosterStudent(student) {
    return(`
      <div id="roster-${student.id}" class="student-roster__student">
        <p class="student-roster__placeholder tag is-medium">${student.first_name}</p>
      </div>
    `)
  }

  responsiveStudentName(student, seatingChartWidth) {
    if (seatingChartWidth < 550) {
      return ( student.first_name[0] )
    }
    else {
      return ( student.first_name )
    }
  };


  appendStudent(el, student) {
    el.append(renderStudent(student));
  }

  resizeChart() {

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

// Utility Functions

var loopElsWithCallback = function(els, callbacks) {
  for (let i = 0; i < els.length; i++) {
    for (let j = 0; j < callbacks.length; j++) {
      callbacks[j](els[i]);
    }
  }
};