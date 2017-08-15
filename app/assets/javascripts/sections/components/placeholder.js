var Placeholder = function(props) {

  var id, firstName, lastName, isVacant;
  id = props.id;
  firstName = props.firstName;
  lastName = props.lastName;
  // isVacant = false;

  function render() {
    return(`
      <div id="roster-${id}" class="student-roster__record tag">
        <p class="student-roster__placeholder">
          ${firstName}
        </p>
      </div>
    `);
  }

  return({
    render: render
  });

};
