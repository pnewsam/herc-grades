var SeatingChart = function(props) {
  
  var seats, numRows, numCols, isEditable, width, height, seatWidth;

  seats = props.seats;  
  numRows = props.numRows;
  numCols = props.numCols;
  
  container = props.container;
  width = props.width;
  seatWidth = (width / numCols) - 10;
  height = seatWidth * numRows + numRows * 10;

  function render(isEditable) {
    for (let i = 0; i < seats.length; i++) {
      $(container).append(seats[i].render(seatWidth, isEditable, numRows));
      let sN = $(container).children().last().find(".seating-chart__student");
      toggleDraggable(sN, isEditable);
    }
  }

  function toggleDraggable(el, isEditable) {
    if (isEditable) {
      $(el).on("dragstart", handleDragstart);
      $(el).attr("draggable","true");
    }
    else {
      $(el).attr("draggable","false");
    }
  }

  function getStudentNodes() {
    return($(".seating-chart").find(".seating-chart__student"));
  }

  function handleDragstart(e) {
    $(".student-roster__filter").removeClass("hide");
    $(".student-roster__notice").removeClass("hide");
    e.originalEvent.dataTransfer.setData("text",e.target.id);
  }

  return({
    height: height,
    render: render
  })

};