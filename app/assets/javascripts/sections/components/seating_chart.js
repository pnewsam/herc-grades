var SeatingChart = function(props) {
  
  var seats, numRows, numCols, isEditable, width, height, seatWidth;

  seats = props.seats;  
  numRows = props.numRows;
  numCols = props.numCols;
  
  container = props.container;
  width = props.width;
  seatWidth = (width / numCols) - 10;
  height = seatWidth * numRows + numRows * 10;

  // function renderDelete() {
  //   return (`<a class="seating-chart__remove-student delete"></a>`);
  // }

  // function bindDeletes() {
  //   $(".seating-chart").on("click", ".seating-chart__remove-student", function(e){
  //     let student = $(this).next().attr("style","");
  //     let seat = $(this).parent(".seating-chart__seat");
  //     makeDraggable(student);
  //     makeDroppable(seat);
  //     $($studentRoster).append(student);
  //     $(this).remove();
  //   });
  // }

  function render(isEditable) {
    for (let i = 0; i < seats.length; i++) {
      $(container).append(seats[i].render(seatWidth, isEditable));
    }
  }

  return({
    height: height,
    render: render
  })

};