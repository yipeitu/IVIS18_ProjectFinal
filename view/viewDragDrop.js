$("#columns")[0].innerHTML = `
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
		      	<div class="column m-1" draggable="true">1.1</div>
		        <div class="column m-1" draggable="true">1.2</div>
		        <div class="column m-1" draggable="true">1.3</div>
		        <div class="column m-1" draggable="true">1.4</div>
		        <div class="column m-1" draggable="true">1.5</div>
		        <div class="column m-1" draggable="true">1.6</div>
		    </div>
	      </td>
	      <td class="dropPlace value-2" style="width: 14.28%" ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
	      	<div class="container">
		      	<div class="column m-1" draggable="true">2.1</div>
		        <div class="column m-1" draggable="true">2.2</div>
		        <div class="column m-1" draggable="true">2.3</div>
		    </div>
	      </td>
	      <td class="dropPlace value-1" style="width: 14.28%" ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
	      	<div class="container">
		      	<div class="column m-1" draggable="true">3.1</div>
		        <div class="column m-1" draggable="true">3.2</div>
		        <div class="column m-1" draggable="true">3.3</div>
		    </div>
	      </td>
	      <td class="dropPlace value0" style="width: 14.28%" ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
	      	<div class="container">
		      	<div class="column m-1" draggable="true">4.1</div>
		        <div class="column m-1" draggable="true">4.2</div>
		        <div class="column m-1" draggable="true">4.3</div>
		    </div>
	      </td>
	      <td class="dropPlace value1" style="width: 14.28%" ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
	      	<div class="container">
		      	<div class="column m-1" draggable="true">5.1</div>
		        <div class="column m-1" draggable="true">5.2</div>
		        <div class="column m-1" draggable="true">5.3</div>
		    </div>
	      </td>
	      <td class="dropPlace value2" style="width: 14.28%" ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
	      	<div class="container">
		      	<div class="column m-1" draggable="true">6.1</div>
		        <div class="column m-1" draggable="true">6.2</div>
		        <div class="column m-1" draggable="true">6.3</div>
		    </div>
	      </td>
	      <td class="dropPlace value3" style="width: 14.28%" ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
	      	<div class="container">
		      	<div class="column m-1" draggable="true">7.1</div>
		        <div class="column m-1" draggable="true">7.2</div>
		        <div class="column m-1" draggable="true">7.3</div>
		    </div>
	      </td>
	    </tr>
	  </tbody>
	</table>
      `;