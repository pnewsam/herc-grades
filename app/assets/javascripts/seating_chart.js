$(document).on("turbolinks:load", function(){

  if (window.location.pathname.indexOf("sections") > 0) {

    var section = new Section($(".seating-chart_container"), $(".seating-chart__roster"))
    $(window).resize(function(){
      section.renderSeats();
    });

    $(".seating-chart__edit-button").on("click",function(){
      if ($(".seating-chart__side-panel--assignments").hasClass('hide')) {
        $(".seating-chart__side-panel--assignments").removeClass('hide');
        $(".seating-chart__side-panel--edit-seating").addClass('hide');
        $(".seating-chart__delete").addClass('hide');
      }
      else {
        $(".seating-chart__side-panel--assignments").addClass('hide');
        $(".seating-chart__side-panel--edit-seating").removeClass('hide');
        $(".seating-chart__delete").removeClass('hide');
      }
    });
    
    $(".seating-chart_container").on("click",".seating-chart__delete",function(event){
      student = $(this).next(".seating-chart__name");
      seat = $(this).parent();
      sId = student.attr("id").replace("student-","");
      $(`#rosterStudent-${sId}`).addClass("is-info draggable");
      seat.empty();
    });

    // $(".seating-chart__place").on("drop",function(event){ drop(event); });
    // $(".seating-chart__place").on("dragover",function(event){ allowDrop(event); });
    // $(".seating-chart__side-panel--edit-seating div").on("drop",function(event){ drop(event); });
    // $(".seating-chart__side-panel--edit-seating div").on("dragover",function(event){ allowDrop(event); });
    // $(".seating-chart__seat").on("dragstart",function(event){ drag(event); });

  }

});

document.addEventListener("dragstart",function(event){
  event.preventDefault()
  event.dataTransfer.setData("text/plain", event.target.id);
  
})

document.addEventListener("drop",function(event){
  event.preventDefault()
  var data = event.dataTransfer.getData("text/plain");
  event.target.append(document.getElementById(data));
})

document.addEventListener("dragover",function(event){
  event.preventDefault();
})

class Section {

  constructor(container, roster) {
    this.section, this.students, this.seats;
    this.fetchData();

    this.containerWidth, this.seatSide;
    this.container = container;
    this.roster = roster;
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
      that.section = response.section;
      that.students = response.students;
      that.seats = response.seats;
      if (response.seats.length > 0) {
        that.renderSeats();
        that.renderRoster();
      }
    });
  }

  updateSizing() {
    let cW = this.container.width();
    let sS = (cW / this.section.number_of_columns) - 10;
    this.containerWidth = cW;
    this.seatSide = sS;
    this.container.height(sS * this.section.number_of_rows + this.section.number_of_rows * 10 + 5);
  }

  renderSeats() {
    this.container.empty();
    this.updateSizing();
    for (let i = 0; i < this.seats.length; i++) {
      let seat = this.seats[i];
      let student;
      if (this.containerWidth < 550) {
        student = this.students.filter(function(student){ return student.id === seat.student_id })[0];
      }
      else {
        student = this.students.filter(function(student){ return student.id === seat.student_id })[0];
      }
      this.container.append(this.renderSeat(seat, student));
    };
  }

  renderSeat(seat,student) {
    let x = (seat.column_number * this.seatSide + seat.column_number * 10 + 5).toString() + 'px';
    let y = (seat.row_number * this.seatSide + seat.row_number * 10 + 5).toString() + 'px';
    let studentName;
    if (this.containerWidth < 550) { studentName = student.first_name[0] }
    else { studentName = student.first_name };
    return(`
      <div class="seating-chart__place" style="transform: translateY(${y}) translateX(${x});">
        <div id="seat-${seat.id}" class="seating-chart__seat is-info" style='width:${this.seatSide}px; height:${this.seatSide}px;' draggable='true'>
          <a class="seating-chart__delete delete hide" style="position:absolute; transform: translateX(${this.seatSide - 25}px) translateY(5px);"></a>
          <p id="student-${student.id}" class="seating-chart__name">${studentName}</p>
        </div>
      </div>
    `);
  }

  renderRoster() {
    for (let i = 0; i < this.students.length; i++) {
      this.roster.append(this.renderRosterName(this.students[i]));
    }
  }

  renderRosterName(student) {
    return(`
      <div id="rosterStudent-${student.id}" class="seating-chart__roster-student tag is-medium">
        <span class="seating-chart__placeholder">${student.last_name}, ${student.first_name[0]}.</span>
        <p id="student-${student.id}" class="seating-chart__name">${student.first_name}</p>
      </div>
    `)
  }
}


  // function drag(ev) {
  //   // console.log(ev)
  //   ev.originalEvent.dataTransfer.setData("text/plain", ev.target.id);
  // }

  // function drop(ev) {
  //   console.log(ev)
  //   ev.preventDefault();
  //   var data = ev.originalEvent.dataTransfer.getData("text/plain");
  //   console.log(data.id)
  //   // el = $(data.id)
  //   // console.log(el)
  //   ev.target.append($(`${data}`));
  // }

  // function allowDrop(ev) {
  //   // console.log(ev)
  //   ev.preventDefault();
  // }
