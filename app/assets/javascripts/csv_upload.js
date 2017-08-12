$(document).ready(function(){

  var csvFile = document.getElementById("section_file");
  if (csvFile) {
    csvFile.onchange = function() {
      if (csvFile.files.length > 0)
      { document.getElementById('section_filename').innerHTML = csvFile.files[0].name; }
    };
  }
});
