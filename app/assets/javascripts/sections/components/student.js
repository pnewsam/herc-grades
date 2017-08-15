var Student = function(props) {

  var id, firstName, lastName;
  if (props) {
    id = props.id;
    firstName = props.first_name;
    lastName = props.last_name;
  }

  function render(isEditable) {
    console.log(isEditable)
    var name;
    if (firstName) { name = firstName; }
    else { name = 'Empty' }
    if (isEditable) {
      console.log('if!')
      return (`
        <p id="student-${id}" class="seating-chart__student" draggable="true" ondragstart="dragAndDrop.handleDragstart(event)">
          ${firstName}
        </p>
      `);
    }
    else {
      console.log('else!')
      return (`
        <p id="student-${id}" class="seating-chart__student">
          ${firstName}
        </p>
      `);
    }
  }

  // function responsiveName() {
  //   if (seatingChartWidth < 550) { return ( first_name.substr(0,3) + '.' ); }
  //   else { return ( first_name ); }
  // }

  return({
    id: id,
    firstName: firstName,
    lastName: lastName,
    render: render
  });

};
