$(document).on("turbolinks:load", function(){

  if (window.location.pathname.indexOf("sections") > 0) {
    var section = new Section($(".seating-chart_container"))
    $(window).resize(function(){
      section.renderSeats();
    });
  } 

});

class Section {

  constructor(container) {
    this.section, this.students, this.seats;
    this.fetchData();

    this.containerWidth, this.seatSide;
    this.container = container;
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
      let studentName;
      if (this.containerWidth < 550) {
        studentName = this.students.filter(function(student){ return student.id === seat.student_id })[0].first_name[0];
      }
      else {
        studentName = this.students.filter(function(student){ return student.id === seat.student_id })[0].first_name;
      }
      this.container.append(this.renderSeat(seat, studentName));
    };
  }

  renderSeat(seat,studentName) {
    let x = (seat.column_number * this.seatSide + seat.column_number * 10 + 5).toString() + 'px';
    let y = (seat.row_number * this.seatSide + seat.row_number * 10 + 5).toString() + 'px';
    return(`
      <div class="seat is-info" style='width:${this.seatSide}px; height:${this.seatSide}px; position: absolute; transform: translateY(${y}) translateX(${x});'>
        <p class="name">${studentName}</p>
      </div>
    `);
  }

}