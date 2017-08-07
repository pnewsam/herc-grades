$(document).on('turbolinks:load', function() {

  $('#student_search').on('focusin',function(e){
    console.log('focusin!')
    var s = new StudentSearch($(this));
  });

})


function StudentSearch(el) {

  this.el = el;
  this.bindEvent(el);
  this.prevVal = el.val();
  this.currentVal;

}

StudentSearch.prototype.bindEvent = function(){
  console.log('bind event!')
  var that = this
  this.el.on('keyup paste change', function(e){
    data = $(this).serialize();
    // if (that.prevVal !== that.currentVal) {
      that.search(data);
      // that.prevVal = that.currentVal;
    // }
  });
}

StudentSearch.prototype.search = function(query){
  console.log('search!')
  var that = this;
  $.ajax({
    url: '/students/search',
    dataType: 'json',
    method: 'GET',
    data: query
  })
  .done(function(response){
    that.renderResponse(response);
  })
};

StudentSearch.prototype.renderResponse = function(response){
  var results = $('#results')
  var str = '<ul>'
  for (let i = 0; i < response.length; i++) {
    str += this.constructLi(response[i]);
  };
  results.html(str.concat('</ul>'));
};

StudentSearch.prototype.constructLi = function(studentObject){
  var str = "<li><a href='/students/"
  str += (studentObject.id + "'>")
  str += (studentObject.first_name + ' ' + studentObject.last_name);
  str += "</a></li>"
  console.log(str);
  return str;
}