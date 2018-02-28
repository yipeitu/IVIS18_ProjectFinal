// LYNNS CODE
$(document).ready(function(){
  // When page loads...:
  // $("div.content").hide(); // Hide all content
  $("div.page").hide();
  $("nav li:first").addClass("current").show(); // Activate first page
  $("div.content div:first").show(); // Show first page content

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
    $(activePage).show(); // Fade in the active page content
  }); // end click method

}); // end $(document).ready method

var jsonList;

var getTarget = function(id){
  $.getJSON("https://yipeitu.github.io/IVIS18_ProjectFinal/data/db_data.json", function(json){
    jsonList = json[id]
    // console.log(jsonList)

    var posList3 = [];
    var posList2 = [];
    var posList1= [];

    var neuList = [];

    var negList1 = [];
    var negList2 = [];
    var negList3 = [];

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
    }

//Change the close info button, perhaps move it to the upper right corner.

  $("#boxDescription")[0].innerHTML = `
  <div style="padding: 10px;">
    <div class="container">
      <button type="button" id="close-info" onclick="turnOffStickyLinks()" class="btn-danger">Close</button>
    </div>
    <div class="row">
      <div class="col-md-7" style="padding-right:0;">
              <p><h4>${jsonList.AI} - ${jsonList.Name}</h4></p>
              <p><text class="contentStyle">Description:</text> ${jsonList.Description}</p>
      </div>
      <div class="col">
        <img src="images/UNpics_targets/Goal_${id}_RGB_NG.svg" class="unImg">
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

var toggle = function(id) {
  $(id).slideToggle();
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
