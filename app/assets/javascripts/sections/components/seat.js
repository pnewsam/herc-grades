var Seat = function(props) {
  
  var id, num, student, rowNum, colNum;
  id = props.id;
  num = props.seat_number;
  student = props.student;
  rowNum = props.row_number;
  colNum = props.column_number;

  function render(seatWidth, isEditable, numRows, seatNumsOnly) {
    let x = (colNum * seatWidth + colNum * 10 + 5).toString() + 'px';
    let y = ((numRows - 1 - rowNum) * seatWidth + (numRows - 1 - rowNum) * 10 + 5).toString() + 'px';
    let s;
    if (student.id && !seatNumsOnly) { s = student.render(isEditable); }
    else if (seatNumsOnly) { s = `<p class="seating-chart__placeholder">${num}</p>` }
    else { s = `<p class="seating-chart__placeholder">Empty</p>` }
    return(`
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