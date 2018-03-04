var createDragDropTable = function(id, influencedTargetsInfo){
	var idName = "table"+id.toString().replace(".", "");
	$("#columns").append(`
		<div id="${idName}">
			<table class="table table-bordered text-center bg-light p-2">
			  <thead>
			  	<tr class="text-light h4" style="background-color: #7A7A79;">
			  	  <th colspan="7">${id+" : "+jsonList.Name}</th>
			  	</tr>
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
			      <td class="dropPlace value-3 class${idName}" ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
			      	<div class="container">
				      	
				    </div>
			      </td>
			      <td class="dropPlace value-2 class${idName}" ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
			      	<div class="container">
				      	
				    </div>
			      </td>
			      <td class="dropPlace value-1 class${idName}" ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
			      	<div class="container">
				      	
				    </div>
			      </td>
			      <td class="dropPlace value0 class${idName}"  ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
			      	<div class="container">
				      	
				    </div>
			      </td>
			      <td class="dropPlace value1 class${idName}"  ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
			      	<div class="container">
				      	
				    </div>
			      </td>
			      <td class="dropPlace value2 class${idName}"  ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
			      	<div class="container">
				      	
				    </div>
			      </td>
			      <td class="dropPlace value3 class${idName}"  ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
			      	<div class="container">
				      	
				    </div>
			      </td>
			    </tr>
			  </tbody>
			</table>
		</div>
	      `);
	Object.keys(influencedTargetsInfo).forEach(function(value){
		$("#"+idName).find("td.value"+value+" > .container").empty();
		influencedTargetsInfo[value].forEach(function(target){
			$("#"+idName).find("td.value"+value+" > .container").append(dragDropTarget(target, idName));
		})
	})

	dragDropAddListeners(idName);
}

var dragDropTarget = function(targetInfo, idName){
	// need to put reason
	return `<div class="column m-1 class${idName}" draggable="true">${targetInfo}</div>`
}