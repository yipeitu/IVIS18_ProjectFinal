var diameter = null,
    radius = null,
    innerRadius = null,
    cluster = null,
    line = null,
    svg = null,
    link = null,
    node = null;
    // sticky_links = false;
    // current_node = null;
    clickedNodes = [];
const MAX_CLICKS = 2;


var drawBall = function(dataFileName){
  diameter = window.innerWidth*0.45,
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
          .attr("class", function(d) {
              return "node node_" + d.data.parent.key;})
          .attr("transform", function(d) {
              return "rotate(" + (d.x - 90) + ")translate("
              + (d.y + 3) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
          // .on("mouseover", mouseovered)
          // .on("mouseout", mouseouted)
          // .on("click", getData);
          .on("mouseover", targetHover)
          .on("mouseout", targetOut)
          .on("click", targetClick);

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
  clickedNodes.length = 0;
  getOptions();
}


function sumOfChildren(d) {
  var sum = 0;
  d.data.imports.forEach(function(t){
    sum = sum + t.value;
  })
  return sum;
}

// function turnOffStickyLinks() {
//   sticky_links = false;
//   $("#boxDescription").empty();
//   mouseouted(current_node);
// }

// function getData(d) {
//   if (!sticky_links || current_node === null) {
//     current_node = d;
//     mouseovered(d);
//     getTarget(d.data.id);
//     sticky_links = !sticky_links;
//   } // first click
//   else if(current_node == d){
//     turnOffStickyLinks();
//     current_node = null;
//     sticky_links = false;
//   } // unclick the selected one
//   else {
//     turnOffStickyLinks();
//     current_node = d;
//     mouseovered(current_node);
//     getTarget(current_node.data.id);
//     sticky_links = !sticky_links;
//   } // click to another target
// }

function getStyle(d) {
  var t_name = d.target.data.name;
  var value;
  d.source.data.imports.forEach(function(d) {
    if (d.target == t_name) {
      value = d.value;
    }
  });
  if (value == 3) {
   color = "#62BF77"; z = 10;
  } else if (value == 2) {
   color = "#96CE7E"; z = 20;
  } else if (value == 1) {
   color = "#D4E578"; z = 30;
  } else if (value == 0) {
   color = "blue"; z = 0;
  } else if (value == -1) {
   color = "#F1A772"; z = 30;
  } else if (value == -2) {
   color = "#F0686A"; z = 20;
  } else if (value == -3) {
   color = "#A54A47"; z = 10;
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

// function mouseovered(d) {
//   if (d === current_node || !sticky_links) {
//     node
//         .each(function(n) { n.target = n.source = false; });

//     // Non-relevant links color change
//     link._groups[0].forEach(function(d) {
//          d.style.stroke = "#f4f4f4";
//          //d.style.opacity = 0.2;
//          });

//     link
//       .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
//       .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
//       .filter(function(l) { return l.source === d; })
//       .attr("style", function(d) {
//         return getStyle(d);
//       })
//       .raise();

//     // class
//     // node--focus: targeted, blue
//     // node-source: positive, green
//     // node-target: negative, red
//     // var neuNodeList = []
//     var valuesNodes = {"3": [], "2": [], "1": [],
//                        "-3": [], "-2": [], "-1": []}
//     d.data.imports.forEach(function(target){
//       if(target.value !== 0){
//         valuesNodes[target.value.toString()].push(target.target)
//       }
//     })
//     node
//         .classed("node--focus", function(n){
//           return n.data.name === d.data.name;
//         })
//         .classed("node3", function(n){
//           return valuesNodes["3"].indexOf(n.data.name) != -1;
//         })
//         .classed("node2", function(n){
//           return valuesNodes["2"].indexOf(n.data.name) != -1;
//         })
//         .classed("node1", function(n){
//           return valuesNodes["1"].indexOf(n.data.name) != -1;
//         })
//         .classed("node-3", function(n){
//           return valuesNodes["-3"].indexOf(n.data.name) != -1;
//         })
//         .classed("node-2", function(n){
//           return valuesNodes["-2"].indexOf(n.data.name) != -1;
//         })
//         .classed("node-1", function(n){
//           return valuesNodes["-1"].indexOf(n.data.name) != -1;
//         })
//         .classed("node-conflict", function(n){
//           return false;
//         })
//   } // hover/click
//   else {
//     node
//         .each(function(n) { n.target = n.source = false; });

//     // Non-relevant links color change
//     link._groups[0].forEach(function(d) {
//          d.style.stroke = "#f4f4f4";
//          //d.style.opacity = 0.2;
//          });
//     link
//       .classed("link--target", function(l) { if (l.target === d || l.target === current_node) return l.source.source = true; })
//       .classed("link--source", function(l) { if (l.source === d || l.source === current_node) return l.target.target = true; })
//       .filter(function(l) { return (l.source === d) || (l.source === current_node); })
//       .attr("style", function(d) {
//         return getStyle(d);
//       })
//       .raise();

//     var clickTargets = [];
//     var hoverTargets = [];

//     var valuesNodes = {"3": [], "2": [], "1": [],
//                        "-3": [], "-2": [], "-1": []}
//     d.data.imports.forEach(function(target){
//       if(target.value !== 0 && target.target != current_node.data.name){
//         hoverTargets.push(target.target);
//         valuesNodes[target.value.toString()].push(target.target)
//       }
//     })

//     current_node.data.imports.forEach(function(target){
//         if(target.value !== 0 && target.target != d.data.name){
//           clickTargets.push(target.target);
//         }
//     })

//     var conflictTargets = clickTargets.filter(function(n) {
//         return hoverTargets.indexOf(n) !== -1;
//     });

//    node
//        .classed("node--focus", function(n){
//           if(n.data.name == d.data.name || n.data.name == current_node.data.name){
//             return true;
//           }
//         })
//         .classed("node3", function(n){
//           return valuesNodes["3"].indexOf(n.data.name) != -1 && conflictTargets.indexOf(n.data.name) == -1;
//         })
//         .classed("node2", function(n){
//           return valuesNodes["2"].indexOf(n.data.name) != -1 && conflictTargets.indexOf(n.data.name) == -1;
//         })
//         .classed("node1", function(n){
//           return valuesNodes["1"].indexOf(n.data.name) != -1 && conflictTargets.indexOf(n.data.name) == -1;
//         })
//         .classed("node-3", function(n){
//           return valuesNodes["-3"].indexOf(n.data.name) != -1 && conflictTargets.indexOf(n.data.name) == -1;
//         })
//         .classed("node-2", function(n){
//           return valuesNodes["-2"].indexOf(n.data.name) != -1 && conflictTargets.indexOf(n.data.name) == -1;
//         })
//         .classed("node-1", function(n){
//           return valuesNodes["-1"].indexOf(n.data.name) != -1 && conflictTargets.indexOf(n.data.name) == -1;
//         })
//         .classed("node-conflict", function(n){
//           return conflictTargets.indexOf(n.data.name) != -1;
//         })
//   } // show the compared
// }

// function mouseouted(d) {
//   if (!sticky_links) {
//     link
//         .classed("link--target", false)
//         .classed("link--source", false)
//         .attr("style", function(d) {
//           return getStyle(d).concat("stroke-opacity: 0.2;");
//         })

//     node
//         .classed("node--focus", false)
//         .classed("node3", false)
//         .classed("node2", false)
//         .classed("node1", false)
//         .classed("node-3", false)
//         .classed("node-2", false)
//         .classed("node-1", false)
//         .classed("node-conflict", false)
//   } // non clicked targets
//   else {
//     mouseovered(current_node);
//   } // after clicked targets
// }

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


function actionClickNodes(d){
  // two targets replace the last one
  if(clickedNodes.length == MAX_CLICKS && clickedNodes.indexOf(d) == -1){
    var id = (clickedNodes[MAX_CLICKS-1].data.id).toString().replace(".", "");
    $("#box"+id).remove();
    $("#table"+id).remove();
    clickedNodes[1] = d;
    getTarget(d.data.id);
    return true;
  }
  // unclick
  else if(clickedNodes.indexOf(d) > -1){
    var id = (clickedNodes[clickedNodes.indexOf(d)].data.id).toString().replace(".", "");
    $("#box"+id).remove();
    $("#table"+id).remove();
    clickedNodes.splice(clickedNodes.indexOf(d), 1);
    if(clickedNodes.length == 0){
      hideInfobox("close");
      targetOut();
    }
    return false;
  }
  // click
  else if(clickedNodes.length < MAX_CLICKS && clickedNodes.indexOf(d) < 0){
    clickedNodes.push(d);
    getTarget(d.data.id);
    hideInfobox();

<<<<<<< HEAD
=======
>>>>>>> gh-pages
    return true;
  } // click
}


function targetHover(hoverTarget){
  /////////////////////////////////////////
  // hover function: for one target click, or not target click
  // otherwise: hover function can't work, when two target are selected
  /////////////////////////////////////////
  node
        .each(function(n) { n.target = n.source = false; });

  // Non-relevant links color change
  link._groups[0].forEach(function(d) {
       d.style.stroke = "#f4f4f4";
       //d.style.opacity = 0.2;
       });

  var namesClick = [];
  var inTargetsClick = [];
  var inTargetsConflict = [];
  var inTargetsHover = [];
  var valuesNodes = {"3": [], "2": [], "1": [],
                     "-3": [], "-2": [], "-1": []}

  if(clickedNodes.length == MAX_CLICKS){
    link
    .classed("link--target", function(l) {
      if (clickedNodes.indexOf(l.source) > -1) return l.source.source = true;
    })
    .classed("link--source", function(l) {
      if (clickedNodes.indexOf(l.source) > -1) return l.target.target = true;
    })
    .filter(function(l) { return clickedNodes.indexOf(l.source) > -1; })
    .attr("style", function(targets) {
      return getStyle(targets);
    })
    .raise();

    clickedNodes.forEach(function(clickTarget){
      var tempInTargets = [];
      namesClick.push(clickTarget.data.name);
      clickTarget.data.imports.forEach(function(target){
        if(target.value !== 0){
          inTargetsClick.push(target.target);
          tempInTargets.push(target.target);
          valuesNodes[target.value.toString()].push(target.target)
        }
      })
      // check two clicked targets conflict
      if(inTargetsConflict.length === 0){
        inTargetsConflict = tempInTargets.slice();
      } else {
        inTargetsConflict = inTargetsConflict.filter(function(n) {
          return tempInTargets.indexOf(n) !== -1;
         });
      }
    })

  } // hover function can't work, when two targets clicked
  // else if(clickedNodes.length === 1) {
  //   //////////// Links from first target clicked ////////////////////////
  //   // Doesn't work properly. Links on hover gets lower opacity instead of the
  //   // ones from the clicked target
  //   link
  //   .classed("link--target", function(l) {
  //     if (clickedNodes.indexOf(l.source) > -1)
  //       return l.source.source = true;
  //   })
  //   .classed("link--source", function(l) {
  //     if (clickedNodes.indexOf(l.source) > -1)
  //       return l.target.target = true;
  //   })
  //   .filter(function(l) { return (clickedNodes.indexOf(l.source) > -1) })
  //   .attr("style", function(clickedNodes) {
  //     // console.log(clickedNodes);
  //     return getStyle(clickedNodes[0]).concat("stroke-opacity: 0.2;");
  //   })
  //   .raise();
  // }
  else {
    // console.log("targetHover: click 1 or click none")
    link
    .classed("link--target", function(l) {
      if (l.target === hoverTarget || clickedNodes.indexOf(l.source) > -1)
        return l.source.source = true;
    })
    .classed("link--source", function(l) {
      if (l.source === hoverTarget || clickedNodes.indexOf(l.source) > -1)
        return l.target.target = true;
    })
    .filter(function(l) { return (l.source === hoverTarget) || (clickedNodes.indexOf(l.source) > -1); })
    .attr("style", function(hoverTarget) {
      return getStyle(hoverTarget);
    })
    .raise();

    // click target
    if(clickedNodes.length > 0){
      namesClick.push(clickedNodes[0].data.name);
      clickedNodes[0].data.imports.forEach(function(target){
        if(target.value !== 0 && target.target != hoverTarget.data.name){
          inTargetsClick.push(target.target);
          valuesNodes[target.value.toString()].push(target.target)
        }
      })
    }

    if(hoverTarget !== clickedNodes[0]){
      // hover target
      hoverTarget.data.imports.forEach(function(target){
        if(target.value !== 0 && namesClick.indexOf(target.target) < 0){
          inTargetsHover.push(target.target);
          valuesNodes[target.value.toString()].push(target.target)
        }
      })

      // Set lower opacity on clicked target
    }

    inTargetsConflict = inTargetsClick.filter(function(n) {
        return inTargetsHover.indexOf(n) !== -1;
    });
  } // hover function can work
  // console.log(namesClick);
  // console.log("click: ", inTargetsClick);
  // console.log("hover: ", inTargetsHover);
  // console.log("conflict: ", inTargetsConflict);

  node
     .classed("node--focus", function(n){
        if(n.data.name == hoverTarget.data.name || namesClick.indexOf(n.data.name) != -1){
          return true;
        }
      })
      .classed("node3", function(n){
        return valuesNodes["3"].indexOf(n.data.name) != -1 && inTargetsConflict.indexOf(n.data.name) == -1 && namesClick.indexOf(n.data.name) == -1;
      })
      .classed("node2", function(n){
        return valuesNodes["2"].indexOf(n.data.name) != -1 && inTargetsConflict.indexOf(n.data.name) == -1 && namesClick.indexOf(n.data.name) == -1;
      })
      .classed("node1", function(n){
        return valuesNodes["1"].indexOf(n.data.name) != -1 && inTargetsConflict.indexOf(n.data.name) == -1 && namesClick.indexOf(n.data.name) == -1;
      })
      .classed("node-3", function(n){
        return valuesNodes["-3"].indexOf(n.data.name) != -1 && inTargetsConflict.indexOf(n.data.name) == -1 && namesClick.indexOf(n.data.name) == -1;
      })
      .classed("node-2", function(n){
        return valuesNodes["-2"].indexOf(n.data.name) != -1 && inTargetsConflict.indexOf(n.data.name) == -1 && namesClick.indexOf(n.data.name) == -1;
      })
      .classed("node-1", function(n){
        return valuesNodes["-1"].indexOf(n.data.name) != -1 && inTargetsConflict.indexOf(n.data.name) == -1 && namesClick.indexOf(n.data.name) == -1;
      })
      .classed("node-conflict", function(n){
        return inTargetsConflict.indexOf(n.data.name) != -1;
      })
      .classed("noAttention", function(n){
        if(namesClick.indexOf(n.data.name) != -1) return false;
        if(inTargetsConflict.indexOf(n.data.name) != -1) return false;
        Object.keys(valuesNodes).forEach(function(key){
          if(valuesNodes[key].indexOf(n.data.name) != -1) return false;
        })
        return true;

      })
}


function targetOut(){
  // keep selected targets and make other targets back to original status
  if (clickedNodes.length == 0) {
    // console.log("targetOut: non-click")
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
        .classed("noAttention", false)
  } // non clicked targets
  else {
    // console.log("targetOut: after click")
    targetHover(clickedNodes[0]);
  } // after clicked targets
}


function targetClick(d){
  // check the target has been clicked or not
  // yes: unclicked -> add target, getData
  // no: clicked -> remove target
  // call targetHover
  actionClickNodes(d)
  targetHover(d);
}

// only for close button
function targetUnClick(id){
  var index = -1;
  clickedNodes.forEach(function(clickedNode){
    if(clickedNode.data.id === id){
      index = clickedNodes.indexOf(clickedNode);
    }
  })
  if(index < 0){
    return;
  }
  id = id.toString().replace(".", "");
  // remove
  if(!actionClickNodes(clickedNodes[index])){
    $("#box"+id).remove();
    $("#table"+id).remove();
    targetOut();
  }
}
