var widthSecond = 960,
	heightSecond = 800,
	duration = 750;
var nodes,links;
var i = 0;
var svgSecond;
var gSecond;
var treeMap = d3.tree().size([360,250]),
    rootSecond;
var nodeSvg, linkSvg, nodeEnter, linkEnter, targetId, jsonFileRadar, currentFirst = null;
var targetsRadar = [];
var noColorRadar = [];

var drawSecondOrder = function(fileName, id, jsonFile){
	// var width = 960,
	// 	height = 1000,
	// 	duration = 750;
	// var nodes,links;
 //    var i = 0;
 	targetId = id
 	targetsRadar = [id]
 	jsonFileRadar = jsonFile
 	$("#secondOrder").empty()
    svgSecond = d3.select("#secondOrder").append("svg")
                .attr("width",widthSecond)
                .attr("height",heightSecond);
    gSecond = svgSecond.append("g").attr("transform", "translate(" + (widthSecond / 2) + "," + (heightSecond / 2) + ")");

	// var treeMap = d3.tree().size([360,250]),
 //    	root;
 //    var nodeSvg, linkSvg, nodeEnter, linkEnter ;

    d3.json("data/"+fileName,function(error,treeData){
        if(error) throw error;

        rootSecond = d3.hierarchy(treeData,function(d){
            return d.children;
        });
        $("#barTargets").empty()
        rootSecond.each(function (d) {
         	if(d.depth <= 1){
         		$("#barTargets").append(`
         			<tr>
         			<td>
         			<button type="button" class="btn-sm rounded btn btn-outline-secondary" id="second${d.data.name}">${d.data.name+" "+d.data["name-long"]}</button>
         			</td>
         			<td>
         			<div class="progress m-2">
  						<div class="progress-bar ${d.data.total>0? "bg-success":"bg-danger"}" role="progressbar" style="width: ${parseInt((Math.abs(d.data.total)/Math.abs(treeData.total))*100)}%" aria-valuenow="${Math.abs(d.data.total)}" aria-valuemin="0" aria-valuemax="${Math.abs(treeData.total)}">${d.data.total}</div>
					</div>
					</td>
					</tr>`)
         	}
            d.name = d.data.name; //transferring name to a name variable
            d.id = i; //Assigning numerical Ids
            i += i;
        });
        $("#barTargets button").on("click", function(){
        	var id = this.id.replace("second", "")
        	if(id === rootSecond.name) click(rootSecond)
        	else{
	        	for(var j=0; j < rootSecond.children.length; j++){
	        		console.log(rootSecond.children[j])
	        		if(rootSecond.children[j].depth <= 1 && rootSecond.children[j].name === this.id.replace("second", "")){
	        			click(rootSecond.children[j])
	        			break
	        		}
	        	}
	        }
        })
        rootSecond.x0 = heightSecond / 2;
        rootSecond.y0 = 0;

        rootSecond.children.forEach(collapse);
        updateSecond(rootSecond);
        drawRadar()
    });
}

function updateSecond(source) {
    //root = treeMap(root);
    nodes = treeMap(rootSecond).descendants();
    //console.log(nodes);
    //links = root.descendants().slice(1);
    links = nodes.slice(1);
    //console.log(links);
    var nodeUpdate;
    var nodeExit;

	// Normalize for fixed-depth.
  	nodes.forEach(function(d) { d.y = d.depth * 180; });
  	nodeSvg = gSecond.selectAll(".node")
               .data(nodes,function(d) { return d.id || (d.id = ++i); });
    //nodeSvg.exit().remove();

    var nodeEnter = nodeSvg.enter()
                    .append("g")
                    //.attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
                    .attr("class", "node")
                    .attr("transform", function(d) { return "translate(" + project(d.x, d.y) + ")"; })
                    //.attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                    .on("click",click)
                    .on("mouseover", function(d) {
      					//var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
						// var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + height / 2;
						$(document).mousemove(function(event) {
							d3.select("#tooltip")
							.style("left", event.pageX)
							.style("top", event.pageY)
							.select("#tooltipText")
							.text(d.data.name+" "+d.data["name-long"]+": "+(d.depth==0? d.data.total:d.data.size));
					    });
						


						d3.select("#tooltip").classed("hidden", false);
                    })
                    .on("mouseout", function() {
                    	d3.select("#tooltip").classed("hidden", true);
			   		});
	
	// nodeEnter.append("rect")
	// 	.attr("height", 15)
 //        .attr("width", function(d) {
 //        	if(d.data.name == targetId){
 //        		return 0;
 //        	} 
 //        	// else if(d.data.total){
 //        	// 	return (Math.abs(parseFloat(d.data.total)))
 //        	// }
 //        	else {
 //        		return (Math.abs(parseFloat(d.data.size)))*5
 //        	}
        	
 //        })
 //        .style("fill", colorSecond);
    nodeEnter.append("circle")
        .attr("r", function(d) {
        	if(d.data.name == targetId){
        		return 0;
        	} 
        	// else if(d.data.total){
        	// 	return (Math.abs(parseFloat(d.data.total)))
        	// }
        	else {
        		return (Math.abs(parseFloat(d.data.size)))*5
        	}
        	
        })
        .style("fill", colorSecond);

    nodeEnter.append("text")
        .attr("dy", ".31em")
        //.attr("x", function(d) { return d.x < 180 === !d.children ? 6 : -6; })
        .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
        // .style("text-anchor", function(d) { return d.x < 180 === !d.children ? "start" : "end"; })
        .style("text-anchor", "start")
        //.attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        // .attr("transform", function(d) { return "rotate(" + (d.x < 180 ? d.x - 90 : d.x + 90) + ")"; })
        .text(function(d) {  return d.data.name; });

    // Transition nodes to their new position.
	var nodeUpdate = nodeSvg.merge(nodeEnter).transition()
		// .duration(duration)
		.attr("transform", function(d) { return "translate(" + project(d.x, d.y) + ")"; });

    nodeSvg.select("circle")
    	.style("fill", colorSecond);


  	nodeUpdate.select("text")
    	.style("fill-opacity", 1);

    // Transition exiting nodes to the parent's new position.
  	var nodeExit = nodeSvg.exit().transition()
    	// .duration(duration)
    	.attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; }) //for the animation to either go off there itself or come to centre
    	.remove();

	nodeExit.select("circle")
		.attr("r", 1e-6);

	nodeExit.select("text")
		.style("fill-opacity", 1e-6);

    nodes.forEach(function(d) {
		d.x0 = d.x;
		d.y0 = d.y;
	});


    linkSvg = gSecond.selectAll(".link")
               .data(links, function(link) { var id = link.id + '->' + link.parent.id; return id; });

	// Transition links to their new position.
    // linkSvg.transition()
    		// .duration(duration);
         // .attr('d', connector);

    // Enter any new links at the parent's previous position.
    linkEnter = linkSvg.enter().insert('path', 'g')
        .attr("class", "link")
        .attr("d", function(d) {
            return "M" + project(d.x, d.y)
                 + "C" + project(d.x, (d.y + d.parent.y) / 2)
                 + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
                 + " " + project(d.parent.x, d.parent.y);
        })
        .style("stroke", colorLinks)
            /*
            function (d) {
        var o = {x: source.x0, y: source.y0, parent: {x: source.x0, y: source.y0}};
        return connector(o);
    });*/

    // Transition links to their new position.
    linkSvg.merge(linkEnter).transition()
        // .duration(duration)
        .attr("d", connector);

    // Transition exiting nodes to the parent's new position.
    linkSvg.exit().transition()
        // .duration(duration)
        .attr("d", /*function (d) {
            var o = {x: source.x, y: source.y, parent: {x: source.x, y: source.y}};
            return connector(o);
        })*/function(d) {
                    return "M" + project(d.x, d.y)
                         + "C" + project(d.x, (d.y + d.parent.y) / 2)
                         + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
                         + " " + project(d.parent.x, d.parent.y);
                })
        .remove();

    // Stash the old positions for transition.


}

function click(d) {
  d3.select("#tooltip").classed("hidden", true);
  if(d.data.name !== targetId && currentFirst !== d.id){
  	currentFirst = d.id
  	rootSecond.children.forEach(collapse);
	if (d.children) {
		d._children = d.children;
		d.children = null;
	} else {
		d.children = d._children;
		d._children = null;
	}
	updateSecond(d);
	if(targetsRadar.indexOf(d.data.name) === -1){
		if(targetsRadar.length === 3){
			targetsRadar.splice(1, 1)
		}
		targetsRadar.push(d.data.name)
		drawRadar()
	}
  } 
  else {
  	updateSecond(rootSecond);
  	// $(window).scrollTop($('.jumbotron').offset().top)
  }
  $(window).scrollTop($('#secondOrder').offset().top-30)
}


function colorSecond(d) {
  if(d.data.total >= 3 || d.data.size >= 3){
  	return "#62BF77"
  } else if(parseInt(d.data.total) == 2 || parseInt(d.data.size) == 2){
  	return "#96CE7E"
  } else if(parseInt(d.data.total) == 1 || parseInt(d.data.size) == 1){
  	return "#D4E578"
  } else if(parseInt(d.data.total) == -1 || parseInt(d.data.size) == -1){
  	return "#F1A772"
  } else if(parseInt(d.data.total) == -2 || parseInt(d.data.size) == -2){
  	return "#F0686A"
  } else if(parseInt(d.data.total) <= -3 || parseInt(d.data.size) <= -3){
  	return "#A54A47"
  } else {
  	return "#cccccc"
  }
  // return d._children ? "#3182bd" // collapsed package
  //     : d.children ? "#c6dbef" // expanded package
  //     : "#fd8d3c"; // leaf node
}

function colorLinks(d) {
  if(parseInt(d.data.total) >= 3 || parseInt(d.data.size) >= 3){
  	return "#62BF77"
  } else if(parseInt(d.data.total) == 2 || parseInt(d.data.size) == 2){
  	return "#96CE7E"
  } else if(parseInt(d.data.total) == 1 || parseInt(d.data.size) == 1){
  	return "#D4E578"
  } else if(parseInt(d.data.total) == -1 || parseInt(d.data.size) == -1){
  	return "#F1A772"
  } else if(parseInt(d.data.tota) == -2 || parseInt(d.data.size) == -2){
  	return "#F0686A"
  } else if(parseInt(d.data.total) <= -3 || parseInt(d.data.size) <= -3){
  	return "#A54A47"
  } else {
  	return "#cccccc"
  }
}


function flatten (root) {
  // hierarchical data to flat data for force layout
  var nodes = [];
  function recurse(node) {
    if (node.children) node.children.forEach(recurse);
    if (!node.id) node.id = ++i;
    else ++i;
    nodes.push(node);
  }
  recurse(root);
  return nodes;
}


function project(x, y) {
  var angle = (x - 90) / 180 * Math.PI, radius = y;
  return [radius * Math.cos(angle), radius * Math.sin(angle)];
}

function connector(d) {
    return "M" + project(d.x, d.y)
             + "C" + project(d.x, (d.y + d.parent.y) / 2)
             + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
             + " " + project(d.parent.x, d.parent.y)
	/*
	  return "M" + d.y + "," + d.x +
	    "C" + (d.y + d.parent.y) / 2 + "," + d.x +
	    " " + (d.y + d.parent.y) / 2 + "," + d.parent.x +
	    " " + d.parent.y + "," + d.parent.x;  */
}

function collapse(d) {
    if (d.children) {
    	d._children = d.children;
    	d._children.forEach(collapse);
    	d.children = null;
    }
}


var drawRadar = function(){
	var widthRadar = 500,
    heightRadar = 500;
	var LegendOptions = []
	// Config for the Radar chart
	var config = {
	    w: widthRadar,
	    h: heightRadar,
	    maxValue: 7,
	    levels: 7,
	    ExtraWidthX: 300,
	    ExtraWidthY: 300
	}
	var colorTargets = d3.scaleOrdinal(d3.schemeCategory10)
	//Call function to draw the Radar chart
	d3.json("data/"+jsonFileRadar, function(error, data) {
	    if (error) throw error;
	    result = []
	    $("#selectedTargetsRadar").empty()
	    // var test = [id, "1.3", "8.5"]
	    for(var j=0; j < targetsRadar.length; j++){
	    	// LegendOptions.push(targetsRadar[j].AI+" "+targetsRadar[j].Name)
	    	var legend = data[targetsRadar[j]].AI+" "+data[targetsRadar[j]].Name
	    	
	    	var noColor = noColorRadar.indexOf(targetsRadar[j].toString()) === -1? false:true
	    	$("#selectedTargetsRadar").append(`
	    		<label class="rounded p-2 text-white" style="opacity:0.75;background-color:${colorTargets(j)}">
            		<input type="checkbox" id="iRadar${targetsRadar[j]}" ${noColor? "":"checked=true"}}> ${legend}</label>
              `)
	    	
	    	var element = []
	    	var keys = Object.keys(data[targetsRadar[j]].affect)
	    	keys.sort(function(a,b){return parseFloat(a)-parseFloat(b)})
	    	for(var k=0; k < keys.length; k++){
	    		element.push({"area": keys[k], 
	    			"value": noColor? 0:(data[targetsRadar[j]].affect[keys[k]]+4), 
	    			"name": keys[k]+" "+data[keys[k]].Name,
	    			"parent": targetsRadar[j]})
	    	}
	    	result.push(element)
	    }
	    RadarChart.draw("#chart", result, config);
	    $("#selectedTargetsRadar input").on("change", function(){
	    	var id = this.id.replace("iRadar", "")
	    	// color
	    	if(this.checked){
	    		if(noColorRadar.indexOf(id) !== -1){
	    			noColorRadar.splice(noColorRadar.indexOf(id), 1)
	    			drawRadar()
	    		}
	    	} else{
	    		// no color
	    		
	    		if(noColorRadar.indexOf(id) === -1){
	    			noColorRadar.push(id)
	    			drawRadar()
	    		}
	    	}
			
		});

	});

}
