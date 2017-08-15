var multifillGrades = function() {

  var $select, $selectFields, value

  $select = $('#grade-multifill').find('select');
  $selectFields = $('.grades.table select');

  var setValues = function(value) {
    for (let i = 0; i < $selectFields.length; i++) {
      $selectFields[i].value = value
    };
  };

  var getValue = function() {
    return $select.val();
  }

  value = getValue();
  setValues(value);

};
