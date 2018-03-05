var treeData =
  {
    "name": "Influencing target",
    "color": "#1998D1",
    "value": "3",
    "children": [
      { "name": "Influenced +3",
        "color": "#62BF77",
        "value": "3",
        "why": "Indivisible (+3): Inextricably linked to the achivement of another goal"},
      { "name": "Influenced +2",
        "color": "#96CE7E",
        "value": "2",
        "why": "Reinforcing (+2): Aids the achivement of another goal"},
      { "name": "Influenced +1",
        "color": "#D4E578",
        "value": "1",
        "why": "Enabling (+1): Created conditions that further another goal"},
      { "name": "No influence" ,
        "color": "#fefe51",
        "value": "0",
        "why": "Consistent (0): No significant positive or negative interaction"},
      { "name": "Influenced -1",
        "color": "#F1A772",
        "value": "-1",
        "why": "Constraining (-1): Limits options on another goal"},
      { "name": "Influenced -2",
        "color": "#F0686A",
        "value": "-2",
        "why": "Counteractioig (-2): Clashed with another goal"},
      { "name": "Influenced -3",
        "color": "#A54A47",
        "value": "-3",
        "why": "Cancelling (-3): Makes it impossible to reach another goal"},
      {
        "name": "Colliding Targets",
        "color": "#BD69FF",
        "value": "2",
        "why": "Two selected targets that influence the same targets"
      }
    ]
  };

// Set the dimensions and margins of the diagram
var margin = {top: 0, right: 5, bottom: 80, left: 110},
    width = window.innerWidth*0.25 - margin.left - margin.right,
    height = 250 -margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg1 = d3.select("#legend").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

// Add title


var exp_text = svg1.append("text")
.attr("class", "influece-exp")
.attr("x", -margin.left + 20)
.attr("y", height+10+16)
.attr("width", 260)
.style("text-anchor", "start")
.text("Indivisible (+3): Inextricably linked to the achivement of another goal")
.attr("font-family", "Pontano Sans") //, sans-serif;
.attr("font-size", "14px")
.attr("fill", "#bbb");

svg1.append("text")
    .attr("x", -margin.left + 10)
    .attr("y", 40)
    .style("text-anchor", "start")
    .text("Legend");

var left_box = svg1.append("rect")
    .attr("class", "side-rect")
    .attr("x", -margin.left + 10)
    .attr("y", height+10)
    .attr("width", 5)
    .attr("height", 24)
    .attr("fill", "#62BF77");


// var right_box = svg1.append("rect")
//     .attr("class", "side-rect")
//     .attr("x", width)
//     .attr("y", -30)
//     .attr("width", 10)
//     .attr("height", 24)
//     .attr("fill", "#62BF77");

var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level
// root.children.forEach(collapse);

update(root);

// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

function update(source) {

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg1.selectAll('g.node')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    });
    // .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('rect')
      .attr('class', 'node')
      .attr('width', 10)
      .attr('height', function(d) {
        return 2.5**Math.abs(parseInt(d.data.value));
      })
      .attr('y', function(d) {
        return  (d.data.value > 0
                ? 2.5**(parseInt(d.data.value))/2 * -1
                : 2.5**Math.abs(parseInt(d.data.value))/2 * -1);
      })
      .attr('x', 0)
      .style("fill", function(d) {
          return d.data.color;
      });

  // Add labels for the nodes
nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("x", function(d) {
          return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", function(d) {
          return d.children || d._children ? "end" : "start";
      })
      .text(function(d) { return d.data.name; })
      .attr("font-family", "Pontano Sans") //, sans-serif;
      .attr("font-size", "12px")
      .attr("fill", function(d) {
        return d.children || d._children ? "#1998D1" : "#bbb";
      })
      .on("mouseover", function(d) {
        d3.select(this).attr("font-size", 14).style("fill", d.data.color);
      })
      .on("mouseout", function(d) {
        d3.select(this).attr("font-size", 12).style("fill", "#bbb");
      })
      .on("click", labelClick);

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) {
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d) {
        return d.data.color;
    })
    .attr('cursor', 'pointer');

  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg1.selectAll('path.link')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      })
      .attr("stroke-width", function(d) {
        return 2.5**Math.abs(parseInt(d.data.value));
      })
      .attr("stroke", function(d) {
        return d.data.color;
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  // Toggle children on click.
  function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}

function labelClick(d) {
  if (d.children || d._children) {return;}
  exp_text.text(d.data.why);
  left_box.attr("fill", d.data.color);
  // right_box.attr("fill", d.data.color);
}
