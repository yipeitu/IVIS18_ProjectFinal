var diameter = null,
    radius = null,
    innerRadius = null,
    cluster = null,
    line = null,
    svg = null,
    link = null,
    node = null;
    sticky_links = false;
    current_node = null;
    clickedNodes = [];

var drawBall = function(dataFileName){
  diameter = window.innerWidth*0.5,
    radius = diameter / 2,
    innerRadius = radius - 180;

   cluster = d3.cluster()
      .size([360, innerRadius]);

   line = d3.radialLine()
      .curve(d3.curveBundle.beta(0.5))
      .radius(function(d) { return d.y; })
      .angle(function(d) { return d.x / 180 * Math.PI; });

   svg = d3.select(".container-viz").append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");

   link = svg.append("g").selectAll(".link"),
      node = svg.append("g").selectAll(".node");

  d3.json("data/"+dataFileName, function(error, classes) {
    if (error) throw error;

    var root = packageHierarchy(classes)
        .sum(function(d) { return d.size; });

    cluster(root);

    link = link
      .data(packageImports(root.leaves()))
      .enter().append("path")
        .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
        .attr("class", "link")
        .attr("style", function(d) {
          return getStyle(d).concat("stroke-opacity: 0.2;")
        })
        .attr("d", line);

    node = node
      .data(root.leaves())
        .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) {
              return "rotate(" + (d.x - 90) + ")translate("
              + (d.y + 3) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
          .on("mouseover", mouseovered)
          .on("mouseout", mouseouted)
          .on("click", getData);

    node.append("text")
        .attr("dy", "0.31em")
        .attr("float", "left")
        .attr("class", "noselect")
        .attr("x", function(d) {
          return (d.x < 180 ? Math.abs(sumOfChildren(d)) + 5
          : -(Math.abs(sumOfChildren(d)) + 5));})
        // .attr("y", barHeight / 2)
        .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
        .text(function(d) { return d.data.key; });

    node.append("rect")
        .attr("width", function(d) {
          var net_sum = sumOfChildren(d);
          return (net_sum > 0 ? net_sum : net_sum*(-1));})
        .attr("height", 10)
        .attr("x", function(d) {
          return (d.x < 180 ? 0
          : - (Math.abs(sumOfChildren(d))));
        })
        .attr("y", -5)
        // Comment this in to color the bars before hovering
        // .attr("fill", function(d) {
        //   return (sumOfChildren(d) > 0 ? "#62BF77"
        //   : "#F1A772")
        // });
  });
}



function sumOfChildren(d) {
  var sum = 0;
  d.data.imports.forEach(function(t){
    sum = sum + t.value;
  })
  return sum;
}

function addClickNodes(d){
  if(clickedNodes.length < 2){
    clickedNodes.push(d);
  } else{
    alert("at most two targets")
  }
}

function removeClickNodes(d){
  if(clickedNodes.indexOf(d) > -1){
    clickedNodes.splice(clickedNodes.indexOf(d), 1);
  }
}

function turnOffStickyLinks() {
  sticky_links = false;
  $("#boxDescription").empty();
  mouseouted(current_node);
}

function getData(d) {
  console.log(current_node)
  if (!sticky_links || current_node === null) {
    current_node = d;
    mouseovered(d);
    getTarget(d.data.id);
    sticky_links = !sticky_links;
  } // first click
  else if(current_node == d){
    turnOffStickyLinks();
    current_node = null;
    sticky_links = false;
  } // unclick the selected one
  else {
    turnOffStickyLinks();
    current_node = d;
    mouseovered(current_node);
    getTarget(current_node.data.id);
    sticky_links = !sticky_links;
  } // click to another target
}

function getStyle(d) {
  var t_name = d.target.data.name;
  var value;
  d.source.data.imports.forEach(function(d) {
    if (d.target == t_name) {
      value = d.value;
    }
  });
  if (value == 3) {
   color = "#62BF77"; z = 1;
  } else if (value == 2) {
   color = "#96CE7E"; z = 2;
  } else if (value == 1) {
   color = "#D4E578"; z = 3;
  } else if (value == 0) {
   color = "blue"; z = 0;
  } else if (value == -1) {
   color = "#F1A772"; z = 3;
  } else if (value == -2) {
   color = "#F0686A"; z = 2;
  } else if (value == -3) {
   color = "#A54A47";
   z = 1;
  }
  var str1 = "stroke-width: ";
  var str2 = 2.5**Math.abs(value);
  var tmp_str = "stroke: ";
  var z_index = "z-index: ".concat(z.toString(), ";");
  var position = "position: absolute;";
  if (value != 0) {
    return str1.concat(str2.toString(), ";", tmp_str, color, ";", z_index);
  } else {
    return "display: none;";
  }
}


function mouseovered(d) {
  if (d === current_node || !sticky_links) {
    node
        .each(function(n) { n.target = n.source = false; });

    // Non-relevant links color change
    link._groups[0].forEach(function(d) {
         d.style.stroke = "#f4f4f4";
         //d.style.opacity = 0.2;
         });

    link
      .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
      .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
      .filter(function(l) { return l.source === d; })
      .attr("style", function(d) {
        return getStyle(d);
      })
      .raise();

    // class
    // node--focus: targeted, blue
    // node-source: positive, green
    // node-target: negative, red
    // var neuNodeList = []
    var valuesNodes = {"3": [], "2": [], "1": [],
                       "-3": [], "-2": [], "-1": []}
    d.data.imports.forEach(function(target){
      if(target.value !== 0){
        valuesNodes[target.value.toString()].push(target.target)
      }
    })
    node
        .classed("node--focus", function(n){
          return n.data.name === d.data.name;
        })
        .classed("node3", function(n){
          return valuesNodes["3"].indexOf(n.data.name) != -1;
        })
        .classed("node2", function(n){
          return valuesNodes["2"].indexOf(n.data.name) != -1;
        })
        .classed("node1", function(n){
          return valuesNodes["1"].indexOf(n.data.name) != -1;
        })
        .classed("node-3", function(n){
          return valuesNodes["-3"].indexOf(n.data.name) != -1;
        })
        .classed("node-2", function(n){
          return valuesNodes["-2"].indexOf(n.data.name) != -1;
        })
        .classed("node-1", function(n){
          return valuesNodes["-1"].indexOf(n.data.name) != -1;
        })
        .classed("node-conflict", function(n){
          return false;
        })
  } // hover/click
  else {
    node
        .each(function(n) { n.target = n.source = false; });

    // Non-relevant links color change
    link._groups[0].forEach(function(d) {
         d.style.stroke = "#f4f4f4";
         //d.style.opacity = 0.2;
         });
    link
      .classed("link--target", function(l) { if (l.target === d || l.target === current_node) return l.source.source = true; })
      .classed("link--source", function(l) { if (l.source === d || l.source === current_node) return l.target.target = true; })
      .filter(function(l) { return (l.source === d) || (l.source === current_node); })
      .attr("style", function(d) {
        return getStyle(d);
      })
      .raise();

    var clickTargets = [];
    var hoverTargets = [];

    var valuesNodes = {"3": [], "2": [], "1": [],
                       "-3": [], "-2": [], "-1": []}
    d.data.imports.forEach(function(target){
      if(target.value !== 0 && target.target != current_node.data.name){
        hoverTargets.push(target.target);
        valuesNodes[target.value.toString()].push(target.target)
      }
    })

    current_node.data.imports.forEach(function(target){
        if(target.value !== 0 && target.target != d.data.name){
          clickTargets.push(target.target);
        }
    })

    var conflictTargets = clickTargets.filter(function(n) {
        return hoverTargets.indexOf(n) !== -1;
    });

   node
       .classed("node--focus", function(n){
          if(n.data.name == d.data.name || n.data.name == current_node.data.name){
            return true;
          }
        })
        .classed("node3", function(n){
          return valuesNodes["3"].indexOf(n.data.name) != -1 && conflictTargets.indexOf(n.data.name) == -1;
        })
        .classed("node2", function(n){
          return valuesNodes["2"].indexOf(n.data.name) != -1 && conflictTargets.indexOf(n.data.name) == -1;
        })
        .classed("node1", function(n){
          return valuesNodes["1"].indexOf(n.data.name) != -1 && conflictTargets.indexOf(n.data.name) == -1;
        })
        .classed("node-3", function(n){
          return valuesNodes["-3"].indexOf(n.data.name) != -1 && conflictTargets.indexOf(n.data.name) == -1;
        })
        .classed("node-2", function(n){
          return valuesNodes["-2"].indexOf(n.data.name) != -1 && conflictTargets.indexOf(n.data.name) == -1;
        })
        .classed("node-1", function(n){
          return valuesNodes["-1"].indexOf(n.data.name) != -1 && conflictTargets.indexOf(n.data.name) == -1;
        })
        .classed("node-conflict", function(n){
          return conflictTargets.indexOf(n.data.name) != -1;
        })
  } // show the compared
}

function mouseouted(d) {
  if (!sticky_links) {
    link
        .classed("link--target", false)
        .classed("link--source", false)
        .attr("style", function(d) {
          return getStyle(d).concat("stroke-opacity: 0.2;");
        })

    node
        .classed("node--focus", false)
        .classed("node3", false)
        .classed("node2", false)
        .classed("node1", false)
        .classed("node-3", false)
        .classed("node-2", false)
        .classed("node-1", false)
        .classed("node-conflict", false)
  } // non clicked targets 
  else {
    mouseovered(current_node);
  } // after clicked targets
}

// Lazily construct the package hierarchy from class names.
function packageHierarchy(classes) {
  var map = {};

  function find(name, data) {
    var node = map[name], i;
    if (!node) {
      node = map[name] = data || {name: name, children: []};
      if (name.length) {
        node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
        node.parent.children.push(node);
        node.key = name.substring(i + 1);
      }
    }
    return node;
  }

  classes.forEach(function(d) {
    find(d.name, d);
  });

  return d3.hierarchy(map[""]);
}

// Return a list of imports for the given array of nodes.
function packageImports(nodes) {
  var map = {},
      imports = [];

  // Compute a map from name to node.
  nodes.forEach(function(d) {
    map[d.data.name] = d;
  });

  // For each import, construct a link from the source to target node.
  nodes.forEach(function(d) {
    if (d.data.imports) d.data.imports.forEach(function(i) {
      imports.push(map[d.data.name].path(map[i.target]));
    });
  });

  return imports;
}
