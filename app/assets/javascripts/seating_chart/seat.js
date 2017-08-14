var Seat = function(data) {
  
  this.student = data.student_id;
  this.rowNum = 

  function render(seat) {
    return (`
      <div id="seat-${seat.id}" class="seating-chart__seat">
      </div>
    `);
  }

  return({
    render: render
  });

};