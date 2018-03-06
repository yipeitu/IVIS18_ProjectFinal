var getTarget = function(id){
  $.getJSON("data/"+jsonFile, function(json){
    jsonList = json[id]
    // console.log(jsonList)
    // console.log(jsonFile)

    var posList3 = [];
    var posList2 = [];
    var posList1= [];

    var neuList = [];

    var negList1 = [];
    var negList2 = [];
    var negList3 = [];

    // console.log(json, id);
    var tragetAffect = jsonList.affect
    // console.log(tragetAffect);

    for (var i in tragetAffect) {
      if (tragetAffect[i] === 3){
        posList3.push(i);
        // console.log("Neutral" + i);
      }
      else if (tragetAffect[i] === 2){
        posList2.push(i);
        // console.log("Neutral" + i);
      }
      else if (tragetAffect[i] === 1){
        posList1.push(i);
        // console.log("Neutral" + i);
      }
      else if (tragetAffect[i] === 0 && i != id){
        neuList.push(i);
        // console.log("Negative" + i);
      }
      else if (tragetAffect[i] === -1){
        negList1.push(i);
        // console.log("HERE -->" + negList1);
        // console.log("Positive" + i);
      }
      else if (tragetAffect[i] === -2){
        negList2.push(i);
        // console.log("Positive" + i);
      }
      else if (tragetAffect[i] === -3){
        negList3.push(i);
        // console.log("HERE -->" + negList3);
        // console.log("Positive" + i);
      }
      // console.log(posList3);


    }

    var dragDropList = {"-3": negList3, "-2": negList2, "-1": negList1,
    "0": neuList, "1": posList1, "2": posList2, "3": posList3};
    createDragDropTable(id, dragDropList, negList3.length+negList2.length+
      negList1.length+neuList.length+posList1.length+posList2.length+posList3.length, json);

// Not really pretty, but it works.
    var barChartText = "";
    var giveMeList = function(list){
      // console.log(list.length)
      if (list.length === 0) {
        barChartText = "";
      }
      else {

        barChartText = list.length;
      }
      if (jsonFile === MONGOLIA){
        return list.length/(0.17+0.022);
      }
      else if (jsonFile === SWEDEN){
        return list.length/(0.34+0.022);
      }
      else {
        return list.length/0.22;
      }

    }

//Change the close info button, perhaps move it to the upper right corner.
//I hade made some changes to the button, but can't get the "pressing effect" to disapear.

  // $("#boxDescription")[0].innerHTML = `
  // <div style="padding: 10px; border-radius: 25px;">
  //   <div class="row">
  //   <div class="col-md-3">
  //   <div class="image-container"
  //   onmouseover=hoverInfo(${parseInt(id)})
  //   onmouseout=unHover("images/UNpics_targets_png/GOAL_${parseInt(id)}_TARGET_${id}.png")
  //   onclick=moreInfo(${parseInt(id)})
  //   >
  //   <img
  //   src="images/UNpics_targets_png/GOAL_${parseInt(id)}_TARGET_${id}.png"
  //   class="unImg"
  //   id="unImg" )
  //   >
  //   <div class="image-text" id="image-text">
  //   <h4>Display info in new tab</h4>
  //   </div>
  //   </div>
  //   <div style="padding-top:.5em;text-align:center;max-width:11.1em;"><i>Click image for more information</i></div>
  //   </div>
  //   <div class="col-md-8" style="padding-right:0;">

  //     <h5>Affects on other targets</h5>
  //     <div class="stacked-bar-graph" id="barChart">
  //       <span style="width:${giveMeList(negList3)}%" class='neg-bar-1'>${barChartText}</span>
  //       <span style="width:${giveMeList(negList2)}%" class='neg-bar-2'>${barChartText}</span>
  //       <span style="width:${giveMeList(negList1)}%" class='neg-bar-3'>${barChartText}</span>

  //       <span style="width:${giveMeList(neuList)}%" class='neu-bar'>${barChartText}</span>

  //       <span style="width:${giveMeList(posList1)}%" class='pos-bar-1'>${barChartText}</span>
  //       <span style="width:${giveMeList(posList2)}%" class='pos-bar-2'>${barChartText}</span>
  //       <span style="width:${giveMeList(posList3)}%" class='pos-bar-3'>${barChartText}</span>
  //     </div>

  //     <div class="legendInfo">
  //       <ul class="legend">
  //         <li>-3</li>
  //         <li>-2</li>
  //         <li>-1</li>
  //         <li>0</li>
  //         <li>+1</li>
  //         <li>+2</li>
  //         <li>+3</li>
  //       </ul>
  //     </div>

  //   <p style="padding-top:10px;"><text class="contentStyle">Total Net Influence:</text> ${jsonList.Sum}</p>
  //   <p onclick="toggle('#description')" class="pointer contentStyle"><i class="fa fa-angle-down"></i> Description</p>
  //   <div id="description" style="display:none;padding-left:17px;max-width:430px;"><p>${jsonList.Description}</p></div>
  //   </div>
  //     <div class="col-md-1">
  //       <div class="buttonContainer">
  //         <button type="button" id="close-info" onclick="hideInfobox('close');" class="btn-secondary"><i class="fa fa-close" style="font-size:30px"></i></button>
  //       </div>
  //     </div>
  //   </div>
  //     </div>
  //     `;
  var idName = id.toString().replace(".", "");
  $("#boxDescription").append(`
  <div id="box${idName}">
    <div class="m-1 p-2 border-1 rounded" style="background-color: #7A7A79;">
      <div class="row">
      <div class="col-md-3">
      <div class="image-container"
      onmouseover=hoverInfo(${id})
      onmouseout=unHover("${idName}")
      onclick=moreInfo(${parseInt(id)})
      >
      <img
      src="${jsonList.Icon}"
      hover="${jsonList.IconHover}"
      icon="${jsonList.Icon}"
      class="unImg"
      id="unImg${idName}" )
      >
      <div class="image-text" id="image-text${idName}">
      <h4>Display info in new tab</h4>
      </div>
      </div>
      <div style="padding-top:.5em;text-align:center;max-width:11.1em;"><i>Click image for more information</i></div>
      </div>
      <div class="col-md-8" style="padding:0;">

        <h5>Affects on other targets</h5>
        <div class="stacked-bar-graph" id="barChart${idName}">
          <span style="width:${giveMeList(negList3)}%" class='neg-bar-1'>${barChartText}</span>
          <span style="width:${giveMeList(negList2)}%" class='neg-bar-2'>${barChartText}</span>
          <span style="width:${giveMeList(negList1)}%" class='neg-bar-3'>${barChartText}</span>

          <span style="width:${giveMeList(neuList)}%" class='neu-bar'>${barChartText}</span>

          <span style="width:${giveMeList(posList1)}%" class='pos-bar-1'>${barChartText}</span>
          <span style="width:${giveMeList(posList2)}%" class='pos-bar-2'>${barChartText}</span>
          <span style="width:${giveMeList(posList3)}%" class='pos-bar-3'>${barChartText}</span>
        </div>

        <div class="legendInfo">
          <ul class="legend">
            <li>-3</li>
            <li>-2</li>
            <li>-1</li>
            <li>0</li>
            <li>+1</li>
            <li>+2</li>
            <li>+3</li>
          </ul>
        </div>

      <p style="padding-top:10px;"><text class="contentStyle">Total Net Influence:</text> ${jsonList.Sum}</p>
      <p onclick="toggle('#description${idName}')" class="pointer contentStyle"><i class="description fa fa-angle-right"></i> Description</p>
      <div id="description${idName}" style="display:none;padding-left:17px;max-width:430px;"><p>${jsonList.Description}</p></div>
      </div>
        <div class="col-md-1">
          <div class="buttonContainer">
            <button type="button" onclick="targetUnClick(${id})" id="close-info${idName}" class="btn-secondary"><i class="fa fa-close" style="font-size:30px"></i></button>
          </div>
        </div>
      </div>
  </div>
      `);
  });
}


var toggle = function(id) {
  if(id ==='#legend'){
    $(id).animate({height:'toggle'},'inherit');
    // $("i").removeClass('fa fa-chevron-down');
    // $("#legendColor").toggleClass("legendColor");
    $(".legendButton").toggleClass('fa fa-chevron-right fa fa-chevron-down');

  }
  else if(id.match("#description") != null){
    $(id).animate({height:'toggle'},'inherit');
    $(".description").toggleClass('fa fa-angle-right fa fa-angle-down');
  }
  else {
    $(id).slideToggle();
  }
}

var hideInfobox = function(close="show") {
  $("#container").addClass("row parent");
  $(".container-viz").addClass("col-md-7");
  $("#boxDescription").show();
//   if ( $("#boxDescription").css('display') === 'block' ){
//     console.log("This function is running");
//     $("#legend").hide();
//     // toggle('#legend');
// }
// else {
//   $("#legend").show();
// }

  if ($('#container').hasClass('container')){
    $("#container").removeClass("container");
    // $("#legend").show();
  }

  if (!$('#container').hasClass('container')){
    // $("#legend").hide(15);
    // toggle("#legend")
  }

  if (close === 'close'){
    $("#container").removeClass("row parent");
    $(".container-viz").removeClass("col-md-7");
    $("#container").addClass("container");
    $("#boxDescription").empty();
    $("#columns").empty();
    // $("#legend").show(500);
    targetOut(null);
  }
}

var goal_web_dict = {
  1: "1-no-poverty",
  2: "2-zero-hunger",
  3: "3-good-health-and-well-being",
  4: "4-quality-education",
  5: "5-gender-equality",
  6: "6-clean-water-and-sanitation",
  7: "7-affordable-and-clean-energy",
  8: "8-decent-work-and-economic-growth",
  9: "9-industry-innovation-and-infrastructure",
  10: "10-reduced-inequalities",
  11: "11-sustainable-cities-and-communities",
  12: "12-responsible-consumption-and-production",
  13: "13-climate-action",
  14: "14-life-below-water",
  15: "15-life-on-land",
  16: "16-peace-justice-and-strong-institutions",
  17: "17-partnerships-for-the-goals"
};

function getTargetWebsite(goal_num) {
  // console.log(goal_web_dict[id]);
  return "https://www.globalgoals.org/" + goal_web_dict[id];
}

function hoverInfo(id) {
  var idName = id.toString().replace(".", "");
  var element = document.getElementById("unImg"+idName);
  id = parseInt(id);
  var image = $("#unImg"+idName).attr("hover");
  // if (id > 9) {
  //   var image = "images/UNpics_goals/transparent" + id + ".png";
  // } else {
  //   var image = "images/UNpics_goals/transparent0" + id + ".png";
  // }
  element.setAttribute('src', image);
  element.style.opacity = "0.4";
  var x = document.getElementById("image-text"+idName);
  x.style.display = "block";
}

function unHover(id) {
  var image = $("#unImg"+id).attr("icon");
  var element = document.getElementById("unImg"+id)
  element.setAttribute('src', image);
  element.style.opacity = "1.0";
  var x = document.getElementById("image-text"+id);
  x.style.display = "none";
}

function moreInfo(id) {
  var url = "https://www.globalgoals.org/" + goal_web_dict[id];
  window.open(url,"_blank")
}
