var Student = function(data) {

  this.id = data.id;
  this.firstName = data.first_name;
  this.lastName = data.last_name;

  function render() {
      return (`
        <p id="student-${this.id}" class="seating-chart__student">
          ${this.first_name}
        </p>
      `);
    }

  function responsiveName(student, seatingChartWidth) {
    if (seatingChartWidth < 550) { return ( this.first_name.substr(0,3) + '.' ); }
    else { return ( this.first_name ); }
  }

  return({
    render: render,
    responsiveName: responsiveName
  });

};
