var dragAndDrop = new DragAndDrop();

$(document).on("turbolinks:load", function(){

  if (window.location.pathname.indexOf("sections") > 0) {
    
    var section = new Section();
  
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