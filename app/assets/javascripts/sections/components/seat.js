var Seat = function(props) {
  
  var id, num, student, rowNum, colNum;
  id = props.id;
  num = props.seat_number;
  student = props.student;
  rowNum = props.row_number;
  colNum = props.column_number;

  function render(seatWidth) {
    let x = (colNum * seatWidth + colNum * 10 + 5).toString() + 'px';
    let y = (((rowNum ) * seatWidth + (rowNum) * 10 + 30) * -1).toString() + 'px';
    let s;
    if (student.id) { s = student.render(); }
    else { s = `<p class="seating-chart__placeholder">Empty</p>` }
    return (`
      <div id="seat-${id}" class="seating-chart__seat" style="height: ${seatWidth}px; width: ${seatWidth}px; transform: translateX(${x}) translateY(${y});">
        ${s}
      </div>
    `);
  }

  return({
    id: id,
    num: num,
    student: student,
    rowNum: rowNum,
    colNum: colNum,
    render: render
  });

};