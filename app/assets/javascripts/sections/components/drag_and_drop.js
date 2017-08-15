var DragAndDrop = function() {

  function makeDroppable(els) {
    els.on("drop",function(event){
      handleDrop(event);
    });
    els.on("dragover",function(event){
      handleDragover(event);
    });
  }

  function makeDraggable(els) {
    els.attr("draggable","true")
    els.on("dragstart",function(event){
      console.log(event)
      handleDragstart(event);
    });
  }
  
  function handleDragover(e) {
    console.log('handleDragover!')
    e.preventDefault();
  }

  function handleDragstart(e) {
    console.log('handleDragstart!')
    e.originalEvent.dataTransfer.setData("text",e.target.id);
  }

  function handleDrop(e) {
    console.log('handleDrop!')
    student = e.originalEvent.dataTransfer.getData("text")
    $(e.target).append($(`#${student}`)).prepend(`<a class="seating-chart__remove-student delete"></a>`);
  }

  return({
    handleDragstart: handleDragstart,
    handleDrop: handleDrop,
    handleDragover: handleDragover
  });

};