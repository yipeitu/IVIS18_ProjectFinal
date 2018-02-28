var diameter = window.innerWidth*0.5,
    radius = diameter / 2,
    innerRadius = radius - 180;

var cluster = d3.cluster()
    .size([360, innerRadius]);

var line = d3.radialLine()
    .curve(d3.curveBundle.beta(0.5))
    .radius(function(d) { return d.y; })
    .angle(function(d) { return d.x / 180 * Math.PI; });

var svg = d3.select(".container-viz").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");

var link = svg.append("g").selectAll(".link"),
    node = svg.append("g").selectAll(".node");

d3.json("https://yipeitu.github.io/IVIS18_ProjectFinal/data/structure_data5.json", function(error, classes) {
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

function sumOfChildren(d) {
  var sum = 0;
  d.data.imports.forEach(function(t){
    sum = sum + t.value;
  })
  return sum;
}

sticky_links = false;
current_node = null;
function turnOffStickyLinks() {
  sticky_links = false;
  $("#boxDescription").empty();
  mouseouted(current_node);
}

function getData(d) {
  if (!sticky_links) {
    current_node = d;
    getTarget(d.data.id);
    sticky_links = !sticky_links;
  }
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
   color = "#89C96D"; z = 1;
  } else if (value == 2) {
   color = "#AFD65B"; z = 2;
  } else if (value == 1) {
   color = "#CADF76"; z = 3;
  } else if (value == 0) {
   color = "blue"; z = 0;
  } else if (value == -1) {
   color = "#F1A772"; z = 3;
  } else if (value == -2) {
   color = "#E57B5B"; z = 2;
  } else if (value == -3) {
   color = "#F0686A"; z = 1;
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
  if (!sticky_links) {
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
    var posSourceList = []
    var negTargetList = []
    d.data.imports.forEach(function(target){
      if(target.value > 0){
        posSourceList.push(target.target);
      }
      else if(target.value < 0){
        negTargetList.push(target.target);
      }
      // else{
      //   neuNodeList.push(target.target);
      // }
    })
    node
        .classed("node--focus", function(n){
          if(n.data.name == d.data.name){
            return true;
          }
        })
        .classed("node--target", function(n) {
          return negTargetList.indexOf(n.data.name) != -1;
        }) // negative
        .classed("node--source", function(n) {
          return posSourceList.indexOf(n.data.name) != -1;
        }) // positive
  }
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
        .classed("node--target", false)
        .classed("node--source", false);
  }
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
