document.addEventListener("DOMContentLoaded", function() {
  console.log('Working!')
  var $autofillButton = document.getElementById('autofill-button')
  var $autofillSelect = document.getElementById('autofill-select')
  var $allSelects = document.querySelectorAll('.grades.table select')
  console.log($allSelects)
  $autofillButton.addEventListener('click',function(){
    var value = $autofillSelect.value;
    console.log(value)
    $allSelects.forEach(function(select){
      select.value = value;
    });
  });
});