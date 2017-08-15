$(document).on('turbolinks:load', function() {

  $('#student_search').on('focusin',function(e){
    var studentSearch = new StudentSearch($(this));
  });

});