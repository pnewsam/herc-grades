var SeatingChart = function(props) {
  
  var seats, numRows, numCols, isEditable, width, height, seatWidth;

  seats = props.seats;  
  numRows = props.numRows;
  numCols = props.numCols;
  isEditable = props.isEditable;
  
  container = props.container;
  width = props.width;
  seatWidth = (width / numCols) - 10;
  height = seatWidth * numRows + numRows * 10;

  function render() {
    for (let i = 0; i < seats.length; i++) {
      $(container).append(seats[i].render(seatWidth));
    }
  }

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

  return({
    height: height,
    render: render
  })

};