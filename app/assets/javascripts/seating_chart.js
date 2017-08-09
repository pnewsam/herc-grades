$(document).on("turbolinks:load", function(){

  seatingChartContainer = $('.seating-chart_container');
  if (seatingChartContainer) {
    var seatingChart = new SeatingChart(seatingChartContainer);
  }

});

var SeatingChart = function(container) {
  this.seats;
  this.students;
  this.section;
  this.fetchSeats();
  
  this.seatSide;
  this.container = container;
  this.containerWidth = container.width();
};

SeatingChart.prototype.calculateSeatSide = function(numberOfColumns, containerWidth) {
  this.seatSide = (containerWidth / numberOfColumns)
};

SeatingChart.prototype.fetchSeats = function() {
  var action = window.location.pathname + '/seats';
  var that = this;
  $.ajax({
    url: action,
    method: 'GET',
    dataType: 'json'
  })
  .done(function(response){
    console.log(response)
    that.seats = response.seats;
    that.students = response.students;
    that.section = response.section;
    that.calculateSeatSide(that.section.number_of_columns,that.containerWidth);
    that.renderSeats();
  });
};

SeatingChart.prototype.renderSeats = function() {
  for (let i = 0; i < this.seats.length; i++) {
    seat = this.seats[i]
    // console.log(seat)
    studentName = this.students.filter(function(student){return student.id === seat.student_id})[0].first_name;
    // console.log(student)
    this.container.append(this.renderSeat(seat, studentName));
  };
};

SeatingChart.prototype.renderSeat = function(seat,student) {
  var xDistance = (seat.column_number * this.seatSide).toString() + 'px'
  var yDistance = (seat.row_number * this.seatSide).toString() + 'px'
  return(`
    <div class="seat" style='width:${this.seatSide}px; height:${this.seatSide}px; position: absolute; transform: translateY(${yDistance}) translateX(${xDistance});'>
    <p class="name">${studentName}</p>
    </div>
  `);
}
