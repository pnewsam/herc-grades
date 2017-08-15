function StudentSearch(searchBar) {
  this.searchBar = searchBar;
  this.bindEvent(searchBar);
}

StudentSearch.prototype.bindEvent = function(searchBar){
  var that = this;
  searchBar.on('keyup paste change', function(){
    query = $(this).serialize();
    that.requestSearch(query);
  });
}

StudentSearch.prototype.requestSearch = function(query){
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

StudentSearch.prototype.renderResponse = function(studentObjects){
  var results = $('#results');
  var ul = '<ul>';
  for (let i = 0; i < studentObjects.length; i++) {
    ul += this.constructLi(studentObjects[i]);
  };
  ul += '</ul>';
  results.html(ul);
};

StudentSearch.prototype.constructLi = function(studentObject){
  var li = `<li><a href='/students/${studentObject.id}'>`;
  li += `${studentObject.first_name} ${studentObject.last_name}`;
  li += '</a></li>';
  return li;
}