function download_json() {
	var id = this.id;
	var targetId = $(this).attr("targetId");

	var idName = id.replace("btn", "");
    // var targetsNum = ($(".column.m-1."+srcTargetName).length)/100;
    var targets = [parseFloat(targetId)]
    var valueData = {}
    valueData[targetId] = 0;
    var valueKeys = [-3, -2, -1, 0, 1, 2, 3];
    for(var i = 0; i < valueKeys.length; i++){
    	var value = valueKeys[i];
    	var childrenElement = $(".value"+value.toString()+".class"+idName).children();
   		var valueList = childrenElement
				    		.contents()
							.filter(function(){
								targets.push(parseFloat($(this).text()))
								valueData[$(this).text().split("[")[0]] = value;
								return $(this).text();
							})
    }
  	targets.sort(function (a, b) { return a-b; });

   $.getJSON("data/"+jsonFile, function(json){
   		var jsonData = json;
   		var rows = [["TargetName", ""].concat(targets)]
   		for(var i = 0; i < targets.length; i++){
   			var target = targets[i].toString();

   			var influencedData = jsonData[target].affect
   			if(target.toString() == targetId){
   				influencedData = valueData
   			}
   			var row = [jsonData[target.toString()].Name, target]
   			for(var j = 0; j < targets.length; j++){
   				row.push(influencedData[targets[j].toString()])
   			}
   			rows.push(row)
   		}
   		const outputCSV = rows;
   		let csvContent = "data:text/csv;charset=utf-8,";
		rows.forEach(function(rowArray){
		   let row = rowArray.join(",");
		   csvContent += row + "\r\n";
		}); 

		var encodedUri = encodeURI(csvContent);
		var element = document.createElement("a");
		element.setAttribute("href", encodedUri);
		element.setAttribute("download", "Target_"+targetId.replace(".","_")+".csv");
		element.style.display = 'none';
  		document.body.appendChild(element);

  		element.click();

  		document.body.removeChild(element);

   })
 //    const rows = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
	// 	let csvContent = "data:text/csv;charset=utf-8,";
	// 	rows.forEach(function(rowArray){
	// 	   let row = rowArray.join(",");
	// 	   csvContent += row + "\r\n";
	// }); 

  // var text = decodeURI(text); // Test should be received encoded
  // var element = document.createElement('a');
  // element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  // element.setAttribute('download', filename + ".json");

  // element.style.display = 'none';
  // document.body.appendChild(element);

  // element.click();

  // document.body.removeChild(element);
}