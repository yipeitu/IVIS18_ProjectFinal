var diameter = window.innerWidth*0.5,
    radius = diameter / 2,
    innerRadius = radius - 120;
console.log("--> ", diameter);

var cluster = d3.cluster()
    .size([360, innerRadius]);

var line = d3.radialLine()
    .curve(d3.curveBundle.beta(0.85))
    .radius(function(d) { return d.y; })
    .angle(function(d) { return d.x / 180 * Math.PI; });

var svg = d3.select(".container-viz").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
  .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");

var link = svg.append("g").selectAll(".link"),
    node = svg.append("g").selectAll(".node");

d3.json("structure_data5.json", function(error, classes) {
  if (error) throw error;
  
  var root = packageHierarchy(classes)
      .sum(function(d) { return d.size; });

  cluster(root);

  link = link
    .data(packageImports(root.leaves()))
    .enter().append("path")
      .each(function(d) { d.source = d[0], d.target = d[d.length - 1]; })
      .attr("class", "link")
      .attr("d", line);

  node = node
    .data(root.leaves())
    .enter().append("text")
      .attr("class", "node")
      .attr("dy", "0.31em")
      .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .text(function(d) { return d.data.key; })
      .on("mouseover", mouseovered)
      .on("mouseout", mouseouted)
      .on("click", getData);
});

function getData(d) {
  getTarget(d.data.id);  
}

function mouseovered(d) {
  node
      .each(function(n) { n.target = n.source = false; });

// Non-relevant links color change
link._groups[0].forEach(function(d) {
     d.style.stroke = "#e2e2e2";
     //d.style.opacity = 0.2;
     });

  link
      .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
<<<<<<< HEAD
      .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
    .filter(function(l) { return l.source === d; })
=======
      .classed("link--source", function(l) { console.log(l); if (l.source === d) return l.target.target = true; })
    .filter(function(l) { return l.target === d || l.source === d; })
>>>>>>> visualization-example
    .attr("style", function(d) {
       var t_name = d.target.data.name;
       var value;
       d.source.data.imports.forEach(function(d) {
         if (d.target == t_name) {
         value = d.value;
        }
       });
       if (value == 3) {
         color = "#62BF77";
         z = 1;
       } else if (value == 2) {
         color = "#96CE7E";
         z = 2;
       } else if (value == 1) {
         color = "#D4E578";
         z = 3;
       } else if (value == 0) {
         color = "#FFEA84";
         z = 3;
       } else if (value == -1) {
         console.log("HEEY");
         color = "#F1A772";
         z = 3;
       } else if (value == -2) {
         console.log("HEEY");
         color = "#F0686A";
         z = 2;
       } else if (value == -3) {
         console.log("HEEY");
         color = "#A54A47";
         z = 1;
       }
       // console.log("Color: ", color);
         var str1 = "stroke-width: ";
         var str2 = 2.5**Math.abs(value);
         var tmp_str = "stroke: ";
         var z_index = "z-index: ".concat(z.toString(), ";");
         var position = "position: absolute;";
         return str1.concat(str2.toString(), ";", tmp_str, color, ";", z_index);})
      .raise();

  node
      .classed("node--target", function(n) { return n.target; })
      .classed("node--source", function(n) { return n.source; });
}

function mouseouted(d) {
  link
      .classed("link--target", false)
      .classed("link--source", false)
      .attr("style", "stroke-width: 1px; stroke-opacity: 0.4;")

  node
      .classed("node--target", false)
      .classed("node--source", false);
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
