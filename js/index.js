// LYNNS CODE
var jsonFile = "db_data.json";
$(document).ready(function(){
  // When page loads...:
  // $("div.content").hide(); // Hide all content
  $("div.page").hide();
  $("nav li:first").addClass("current").show(); // Activate first page
  $("div.content div:first").show(); // Show first page content
  drawBall("structure_data5.json");
  // On Click Event (within list-element!)
  $("nav div").click(function() {
    $("nav a").removeClass("current"); // Remove any active class
    $(this).addClass("current"); // Add "current" class to selected page
    // console.log(this);

    $("div.page").hide(); // Hide all content
    // $("div").show(); //Show is div in the contact page
    // $("div.lynn").show();
    // $("div.lynn2").show();

    // Find the href attribute value to identify the active page+content:
    var activePage = $(this).find("a").attr("href");
    $(activePage.split("/")[0]).show(); // Fade in the active page content
    switch(activePage.split("/")[1]){
      case "sweden":
        $(".container-viz").empty();
        drawBall("structure_data5.json");
        $("#boxDescription").empty();
        jsonFile = "db_data.json";
        break;
      case "mongolia":
        $(".container-viz").empty();
        drawBall("structure_mongolia.json");
        $("#boxDescription").empty();
        jsonFile = "data_mongolia.json";
        break;
      default:
        break;
    }
  }); // end click method

}); // end $(document).ready method

var jsonList;

var getTarget = function(id){
  $.getJSON("data/"+jsonFile, function(json){
    jsonList = json[id]
    // console.log(jsonList)

    var posList3 = [];
    var posList2 = [];
    var posList1= [];

    var neuList = [];

    var negList1 = [];
    var negList2 = [];
    var negList3 = [];

    console.log(json, id);
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
      else if (tragetAffect[i] === 0){
        neuList.push(i);
        // console.log("Negative" + i);
      }
      else if (tragetAffect[i] === -1){
        negList1.push(i);
        // console.log("Positive" + i);
      }
      else if (tragetAffect[i] === -2){
        negList2.push(i);
        // console.log("Positive" + i);
      }
      else if (tragetAffect[i] === -3){
        negList3.push(i);
        // console.log("Positive" + i);
      }
      // console.log(posList3);


    }

// Not really pretty, but it works.
    var barChartText = "";
    var giveMeList = function(list){
      console.log(list.length)
      if (list.length === 0) {
        barChartText = "";
      }
      else {

        barChartText = list.length;
      }
      return list.length;
    }

//Change the close info button, perhaps move it to the upper right corner.
//I hade made some changes to the button, but can't get the "pressing effect" to disapear.

  $("#boxDescription")[0].innerHTML = `
  <div style="padding: 10px;">
    <div class="buttonContainer">
      <button type="button" id="close-info" onclick="turnOffStickyLinks()" class="btn-secondary"><i class="fa fa-close" style="font-size:30px"></i></button>
    </div>
    <div class="row">
      <div class="col-md-7" style="padding-right:0;">
              <p><h4 class="targetTitel">${jsonList.AI} - ${jsonList.Name}</h4></p>
              <p><text class="contentStyle">Description:</text> ${jsonList.Description}</p>
      </div>
      <div class="col">
        <div class="image-container"
          onmouseover=hoverInfo(${parseInt(id)})
          onmouseout=unHover("images/UNpics_targets_png/GOAL_${parseInt(id)}_TARGET_${id}.png")
          onclick=moreInfo(${parseInt(id)})
        >
          <img 
            src="images/UNpics_targets_png/GOAL_${parseInt(id)}_TARGET_${id}.png" 
            class="unImg" 
            id="unImg" )
          >
          <div class="image-text" id="image-text">
            <h4>Display info in new tab</h4>
          </div>
        </div>
        <div style="padding-top:.5em;text-align:center;"><i>Click image for more information</i></div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p><text class="contentStyle">Total Net Influence:</text> ${jsonList.Sum}</p>
        <h5>Affects on other targets</h5>
        <div class="stacked-bar-graph" id="barChart">
          <span style="width:${giveMeList(negList3)}%" class='neg-bar-3'>${barChartText}</span>
          <span style="width:${giveMeList(negList2)}%" class='neg-bar-2'>${barChartText}</span>
          <span style="width:${giveMeList(negList1)}%" class='neg-bar-1'>${barChartText}</span>

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
        <p onclick="toggle('#positive')" class="pointer"><i class="fa fa-angle-down"></i> Positive influence</p>
        <div id="positive" style="display:none;">
          <li><text class="posToNeg">+3:</text> ${posList3}</li>
          <li><text class="posToNeg">+2:</text> ${posList2} </li>
          <li><text class="posToNeg">+1:</text> ${posList1}</li>
        </div>
        <p onclick="toggle('#neutral')" class="pointer"><i class="fa fa-angle-down"></i> No obvious influence</p>
        <div id="neutral" style="display:none;">
          <li><text class="posToNeg">0:</text>${neuList}</li>
            </div>
            <p onclick="toggle('#negative')" class="pointer"><i class="fa fa-angle-down"></i> Negative influence</p>
            <div id="negative" style="display:none;">
              <li><text class="posToNeg">-3:</text> ${negList1}</li>
              <li><text class="posToNeg">-2:</text> ${negList2}</li>
              <li><text class="posToNeg">-1:</text> ${negList3}</li>
            </div>
          </div>
        </div>
      </div>
      `
  });
}

var member_info_list = [];
var getMemberInfo = function() {
  $.getJSON("data/member_info.json", function(json_m){
    var text = "";
    console.log(json_m)
    for (var i in json_m) {
      member_info_list = json_m[i];

      text += `<div class="memberInfoBox">
      <img src="${member_info_list.image}"></img>
      <div class="lynn" style="float:left; text-align:left;">
      <br>
      <p>${member_info_list.name}</p>
      <p>email: <a href="">${member_info_list.email}</a></p>
      <p>Role:${member_info_list.role}</p>
      </div></div>`

      $(".memberContainer")[0].innerHTML = text;

      console.log(member_info_list);
    }

});
}

var toggle = function(id) {
  $(id).slideToggle();
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
  console.log(goal_web_dict[id]);
  return "https://www.globalgoals.org/" + goal_web_dict[id];
}

function hoverInfo(id) {
  var element = document.getElementById("unImg")
  if (id > 9) {
    var image = "images/UNpics_goals/" + id + ".jpg";
  } else {
    var image = "images/UNpics_goals/0" + id + ".jpg";
  }
  element.setAttribute('src', image);
  element.style.opacity = "0.4";
  var x = document.getElementById("image-text");
  x.style.display = "block";
}

function unHover(image) {
  var element = document.getElementById("unImg")
  element.setAttribute('src', image);
  element.style.opacity = "1.0";
  var x = document.getElementById("image-text");
  x.style.display = "none";
}

function moreInfo(id) {
  var url = "https://www.globalgoals.org/" + goal_web_dict[id];
  window.open(url,"_blank")
}

//Function for stacked bar chart
// var label ="";
// var label2 ="";
// var getPercentage = function(list, list2){
//     // console.log([list]);
//   // label += Math.round(list*100)/100;
//   // label2 += Math.round(list2*100)/100;
//   console.log(label);
//   console.log(label2);
//   document.getElementById("barChart").innerHTML = "<span style='width:" + list + "%'" + " class='bar-1'>Hey</span>" +
//    "<span style='width:" + list2 + "%'" + " class='bar-2'>Hey</span>"
// };
