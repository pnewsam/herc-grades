$(document).on("turbolinks:load", function(){

  if (window.location.pathname.indexOf("sections") > 0) {
    var section = new Section($(".seating-chart"), $(".student-roster"), $(".assignment-list"))
    
  }

});

var Section = function($seatingChart, $studentRoster, $assignmentList) {

    var section, students, seats, $editButton, seatingChartWidth, seatSideLength, isEditable;
    isEditable = false;
    fetchData();
    collectNodes();
    bindEvents();

  function fetchData() {
    var action, that;
    action = window.location.pathname + '/seats';
    that = this;
    $.ajax({
      url: action,
      method: 'GET',
      dataType: 'json'
    })
    .done(function(r) {
      that.students = init(r.students, iStudent);
      that.seats = init(r.seats, iSeat);
    });
  }

  function init(data, callback) {
    let a = [];
    for (let i = 0; i < data.length; i++) {
      obj = callback(data[i]);
      a.push(obj);
    }
    return a;
  }

  function iStudent(args) { return new Person(args); };
  function iSeat(args) { return new Seat(args); };
  function iSeatingChart(args) { return new SeatingChart(args); };





  function collectNodes() {
    $studentNodes = $(".seating-chart").find(".seating-chart__student");
    $seatNodes = $(".seating-chart__seat");
    $editButton = $seatingChart.parent().find(".seating-chart__edit-button");
  }

  function bindEvents() {
    $editButton.on("click", function(event){ toggleEditable(); });

    // On resize, re-render Seating Chart
    $(window).resize(function(){
      renderSeatingChart();
    });
  }


  function toggleEditable() {
    if (isEditable && confirm("Are you sure? Your edits won't be saved.")) {
      isEditable = false;
      $assignmentList.removeClass("hide");
      $studentRoster.addClass("hide");
      for (let i = 0; i < $seatNodes.length; i++) {
        $($seatNodes[i]).find(".seating-chart__remove-student").remove();
      }
      reseatStudents();
    }
    else {
      isEditable = true;
      $assignmentList.addClass("hide");
      $studentRoster.removeClass("hide");
      for (let i = 0; i < $seatNodes.length; i++) {
        $($seatNodes[i]).prepend(renderDelete());
      }
      bindDeletes();
    }
  };


  function findSeatByNode(seatNode) {
    let seatId = Number(seatNode.attr("id").replace("seat-",""));
    let seat = seats.filter(function(seat){ return seat.id == seatId; })[0];
    return seat;
  }

  function findStudentByNode(studentNode) {
    let studentId = Number(studentNode.attr("id").replace("student-",""));
    let student = students.filter(function(student){ return student.id === studentId; })[0];
    return student;
  }

  function resizeEl(el,seatSideLength) {
   el.css("width",`${seatSideLength}px`).css("height",`${seatSideLength}px`);
  }

  function renderDelete() {
    return (`<a class="seating-chart__remove-student delete"></a>`);
  }

  function bindDeletes() {
    $(".seating-chart").on("click", ".seating-chart__remove-student", function(e){
      let student = $(this).next().attr("style","");
      let seat = $(this).parent(".seating-chart__seat");
      makeDraggable(student);
      makeDroppable(seat);
      $($studentRoster).append(student);
      $(this).remove();
    });
  }

  function reseatStudents() {
    let unseatedStudents = $($studentRoster).find(".seating-chart__student");
    for (let i = 0; i < unseatedStudents.length; i++) {
      seatId = seats.filter(function(seat){ return seat.student_id == $(unseatedStudents[i]).attr("id").replace("student-",""); })[0].id;
      $(`#seat-${seatId}`).append($(unseatedStudents[i]));
    }
  }

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

  return ({
    renderSeatingChart: renderSeatingChart
  });

};





  // function Person(args){
  //   // console.log(args);
  //   this.name = args.name;
  // }

  // function initPerson(args) {
  //   return new Person(args);
  // }

  // function initialize(data,callback) {
  //   let a = []
  //   for (let i = 0; i < data.length; i++) {
  //     obj = callback(data[i]);
  //     a.push(obj);
  //   }
  //   return a;
  // }

  // var data = [
  //   {
  //     name: 'Bob'
  //   },
  //   {
  //     name: 'Caroline'
  //   }
  // ];

  // initialize(data,initPerson);