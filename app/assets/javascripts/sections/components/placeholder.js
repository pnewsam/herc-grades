var Placeholder = function(props) {

  var id, firstName, lastName, isVacant;
  id = props.id;
  firstName = props.firstName;
  lastName = props.lastName;
  // isVacant = false;

  function render() {
    return(`
      <div id="roster-${id}" class="student-roster__record">
        <p class="student-roster__placeholder tag is-medium">
          ${firstName}
        </p>
      </div>
    `);
  }

  return({
    id: id,
    render: render
  });

};
