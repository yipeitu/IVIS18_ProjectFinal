var createDragDropTable = function(id, influencedTargetsInfo){
	id = "table"+id;
	$("#columns").append(`
		<div id="${id}">
			<table class="table table-bordered text-center bg-light">
			  <thead>
			    <tr>
			      <th scope="col">-3</th>
			      <th scope="col">-2</th>
			      <th scope="col">-1</th>
			      <th scope="col">0</th>
			      <th scope="col">1</th>
			      <th scope="col">2</th>
			      <th scope="col">3</th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr>
			      <td class="dropPlace value-3" style="width: 14.28%" ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
			      	<div class="container">
				      	
				    </div>
			      </td>
			      <td class="dropPlace value-2" style="width: 14.28%" ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
			      	<div class="container">
				      	
				    </div>
			      </td>
			      <td class="dropPlace value-1" style="width: 14.28%" ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
			      	<div class="container">
				      	
				    </div>
			      </td>
			      <td class="dropPlace value0" style="width: 14.28%" ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
			      	<div class="container">
				      	
				    </div>
			      </td>
			      <td class="dropPlace value1" style="width: 14.28%" ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
			      	<div class="container">
				      	
				    </div>
			      </td>
			      <td class="dropPlace value2" style="width: 14.28%" ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
			      	<div class="container">
				      	
				    </div>
			      </td>
			      <td class="dropPlace value3" style="width: 14.28%" ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
			      	<div class="container">
				      	
				    </div>
			      </td>
			    </tr>
			  </tbody>
			</table>
		</div>
	      `);

	Object.keys(influencedTargetsInfo).forEach(function(value){
		$("#"+id+" > td.value"+value+" > .container").empty();
		influencedTargetsInfo[value].forEach(function(target){
			$("td.value"+value+" > .container").append(dragDropTarget(target));
		})
	})

	dragDropAddListeners(id);
}

var dragDropTarget = function(targetInfo){
	// need to put reason
	return `<div class="column m-1" draggable="true">${targetInfo}</div>`
}