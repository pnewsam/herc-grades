var StudentRoster = function(props) {

  var placeholders, container, students, filter;
  placeholders = [];
  container = props.container;
  filter = $(container).find(".student-roster__filter");

  init(props.placeholders);

  function init(phs) {
    for (let i = 0; i < phs.length; i++) {
      ph = new Placeholder(phs[i]);
      placeholders.push(ph);
    }
    makeDroppable();
  }

  function makeDroppable() {
    $(container).on("drop", handleDrop);
    $(container).on("dragover", handleDragover);
  }
  
  function handleDragover(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    $(".student-roster__filter").addClass("hide");
    $(".student-roster__notice").addClass("hide");
    let sId = e.originalEvent.dataTransfer.getData("text").replace("student-","");
    let s = $(`#student-${sId}`);
    $(`#roster-${sId}`).append($(s));
  }

  function render() {
    for (let i = 0; i < placeholders.length; i++) {
      $(container).append(placeholders[i].render());
    }
    $(container).append(renderFilter());
  }

  function renderFilter() {
    return(
      `
      <p class="student-roster__notice title is-3 has-text-centered">Drag students here</p>
      <div class="student-roster__filter">
      </div>
      `
    );
  }

  return({
    render: render
  });

};