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
	var srcTargetName = "";
	dragSrcEl.classList.value.split(" ").forEach(function(className){
		if(className.match("classtable") != null){
			srcTargetName = className;
		}
	})
	var dropTargetName = "";
	e.target.classList.value.split(" ").forEach(function(className){
		if(className.match("classtable") != null){
			dropTargetName = className;
		}
	})
	
	// can not drop into different target table
	if(srcTargetName != dropTargetName){
		return;
	}

	if(e.target === dragSrcParent || e.target.parentNode.parentNode === dragSrcParent){
		// drop in the same column
		return;
	}
	
    e.preventDefault();
    $(dragSrcEl).addClass("customisze");
    switch(e.target.nodeName){
    	case "TD":
    		$(e.target.children).append(dragSrcEl);
    		break;
    	case "DIV":
    		$(e.target.parentNode).append(dragSrcEl);
    		break;
    }

    var idName = srcTargetName.replace("class", "");
    var targetsNum = ($(".column.m-1."+srcTargetName).length)/100;
    [-3, -2, -1, 0, 1, 2, 3].forEach(function(value){
    	var childrenElement = $(".value"+value.toString()+"."+srcTargetName).children();
   		var valueList = childrenElement
				    		.contents()
							.filter(function(){
								return $(this).text();
							})
		colorBar(idName, value, valueList.length, targetsNum);

    })
}

function handleDragEnd(e) {
  // this/e.target is the source node.
  var cols = document.querySelectorAll('#columns .column');
  [].forEach.call(cols, function (col) {
    col.classList.remove('over');
  });
}


var dragDropAddListeners = function(id){
	// add listener
	var cols = document.querySelectorAll('#'+id+' .column');
	[].forEach.call(cols, function(col) {
	  col.addEventListener('dragstart', handleDragStart, false);
	  col.addEventListener('dragenter', handleDragEnter, false);
	  col.addEventListener('dragover', handleDragOver, false);
	  col.addEventListener('dragleave', handleDragLeave, false);
	  col.addEventListener('dragend', handleDragEnd, false);
	});

	$("#columns").show();
}