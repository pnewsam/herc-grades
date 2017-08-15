var Student = function(props) {

  var id, firstName, lastName;
  if (props) {
    id = props.id;
    firstName = props.first_name;
    lastName = props.last_name;
  }

  function render() {
    var name;
    if (firstName) {
      name = firstName;
    }
    else { name = 'Empty' }
      return (`
        <p id="student-${id}" class="seating-chart__student">
          ${firstName}
        </p>
      `);
    }

  function responsiveName() {
    if (seatingChartWidth < 550) { return ( first_name.substr(0,3) + '.' ); }
    else { return ( first_name ); }
  }

  return({
    id: id,
    firstName: firstName,
    lastName: lastName,
    render: render
  });

};
