var SeatingChart = function(data) {
  
  this.seats = data.seats;
  this.seatLength = data.seatLength;

  function resizeChart() {
    updateSizing();
    collectNodes();
    for (let i = 0; i < $seatNodes.length; i++) {
      let seatNode = $($seatNodes[i]);
      let seat = findSeatByNode(seatNode);
      resizeEl(seatNode,seatSideLength);
      translateSeat(seat,seatSideLength);
    }
    for (let j = 0; j < $studentNodes.length; j++) {
      let studentNode = $($studentNodes[j]);
      let student = findStudentByNode(studentNode)
      studentNode.text(`${responsiveStudentName(student, seatingChartWidth)}`);
    }
  }

  function findAndAppendStudent(seat,context) {
    let student = students.filter(function(student) { return seat.student_id === student.id; })[0];
    $(`#seat-${seat.id}`).append(renderStudent(student));
  }

  function translateSeat(seat, seatSideLength) {
    let x = (seat.column_number * seatSideLength + seat.column_number * 10 + 5).toString() + 'px';
    let y = (seat.row_number * seatSideLength + seat.row_number * 10 + 5).toString() + 'px';
    $(`#seat-${seat.id}`).css("transform",`translateX(${x}) translateY(${y})`);
  }

  function updateSizing() {
    seatingChartWidth = $seatingChart.width();
    seatSideLength = (seatingChartWidth / section.number_of_columns) - 10;
    $seatingChart.height(seatSideLength * section.number_of_rows + section.number_of_rows * 15);
  }

  function render() {
    for (let i = 0; i < seats.length; i++) {
      let seat = seats[i];
      $seatingChart.append(renderSeat(seat));
      findAndAppendStudent(seat);
    }
    resizeChart();
  }



  return({
    render: render
  })

};