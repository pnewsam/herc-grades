var StudentRoster = function(props) {

  var placeholders, container, students;
  placeholders = [];
  container = props.container;

  init(props.placeholders);

  function init(phs) {
    for (let i = 0; i < phs.length; i++) {
      ph = new Placeholder(phs[i]);
      placeholders.push(ph);
    }
  }

  function handleDrop(e) {
    student = e.originalEvent.dataTransfer.getData("text")
    $(e.target).append($(`#`)).prepend(`<a class="seating-chart__remove-student delete"></a>`);
  }

  function makeDroppable(els) {
    els.on("drop",function(event){
      handleDrop(event);
    });
    els.on("dragover",function(event){
      handleDragover(event);
    });
  }

  function findPlaceholder(id) {
    placeholders.filter(function(ph){ return ph.id === id })[0];
  }

  function render() {
    $(container).html("").prepend(`<h2 class="title is-2">Change Seating</h2>`);
    for (let i = 0; i < placeholders.length; i++) {
      $(container).append(placeholders[i].render());
    }
  }

  return({
    render: render
  });

};