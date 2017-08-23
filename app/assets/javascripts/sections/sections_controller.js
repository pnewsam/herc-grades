$(document).on("turbolinks:load", function(){

  var path = window.location.pathname;

  if (path.indexOf("sections") > 0) {

    props = { seatNumsOnly: false };
    if (path.indexOf("seating_chart/edit") > 0) {
      props.seatNumsOnly = true;
    }
    var section = new Section(props);
  
    var csvFile = document.getElementById("section_file");
    if (csvFile) {
      csvFile.onchange = function() {
        if (csvFile.files.length > 0) {
          document.getElementById('section_filename').innerHTML = csvFile.files[0].name;
        }
      };
    }

  }

});