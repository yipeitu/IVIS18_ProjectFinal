var dragSrcEl = null;
var dragSrcParent = null;

function handleDragStart(e) {
  dragSrcParent = e.target.parentNode.parentNode;
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
  return false;
}

function handleDragEnter(e) {
  // this / e.target is the current hover target.
  this.classList.add('over');
}

function handleDragLeave(e) {
  this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
  // console.log(dragSrcParent);
	// console.log(e.target);
	if(e.target === dragSrcParent || e.target.parentNode.parentNode === dragSrcParent){
		// drop in the same column
		return;
	}
	// console.log(e.target.nodeName);
    e.preventDefault();
    // var data = ev.dataTransfer.getData("text");
    // var data = e.dataTransfer.getData('text/html');
    $(dragSrcEl).addClass("customisze");
    switch(e.target.nodeName){
    	case "TD":
    		$(e.target.children).append(dragSrcEl);
    		break;
    	case "DIV":
    		$(e.target.parentNode).append(dragSrcEl);
    		break;
    }
    // $("td.value-3 > .container").append(dragSrcEl);
    // ev.target.appendChild(document.getElementById(data));
    // ev.target.children[0].appendChild(`<div class="column m-1" draggable="true">${data}</div>`);
  // // this/e.target is current target element.

  // if (e.stopPropagation) {
  //   e.stopPropagation(); // Stops some browsers from redirecting.
  // }

  // // Don't do anything if dropping the same column we're dragging.
  // if (dragSrcEl != this) {
  // 	console.log('here');
  //   // Set the source column's HTML to the HTML of the column we dropped on.
  //   dragSrcEl.innerHTML = this.innerHTML;
  //   console.log(e.dataTransfer.getData('text/html'));
  //   this.innerHTML = e.dataTransfer.getData('text/html');
  // }
  // return false;
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  var cols = document.querySelectorAll('#columns .column');
  [].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });
}

var dragDropTarget = function(targetInfo){
	// need to put reason
	return `<div class="column m-1" draggable="true">${targetInfo}</div>`
}

var dragDropTable = function(influencedTargetsInfo){

	Object.keys(influencedTargetsInfo).forEach(function(value){
		$("td.value"+value+" > .container").empty();
		influencedTargetsInfo[value].forEach(function(target){
			$("td.value"+value+" > .container").append(dragDropTarget(target));
		})
	})
	// add listener
	var cols = document.querySelectorAll('#columns .column');
	[].forEach.call(cols, function(col) {
	  col.addEventListener('dragstart', handleDragStart, false);
	  col.addEventListener('dragenter', handleDragEnter, false);
	  col.addEventListener('dragover', handleDragOver, false);
	  col.addEventListener('dragleave', handleDragLeave, false);
	  // col.addEventListener('drop', handleDrop, false);
	  col.addEventListener('dragend', handleDragEnd, false);
	});

	$("#columns").show();
}