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
    console.log(this);

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
$.getJSON("https://yipeitu.github.io/IVIS18_ProjectFinal/db_data.json", function(json){
  // for (var i in json) {
    jsonList = json;
  // }
});

var getTarget = function(id){
  var posList3 = [];
  var posList2 = [];
  var posList1= [];

  var neuList = [];

  var negList1 = [];
  var negList2 = [];
  var negList3 = [];

  var tragetAffect = jsonList[id].affect
  console.log(tragetAffect);

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
  }
  $("#boxDescription")[0].innerHTML = `<p><h4>${jsonList[id].AI} - ${jsonList[id].Name}</h4></p>
              <p><text class="contentStyle">Description:</text> ${jsonList[id].Description}</p>
              <p><text class="contentStyle">Total Net Influence:</text> ${jsonList[id].Sum}</p>
              <h5>Affects on other targets</h5>
              <p onclick="toggle('#positive')" class="pointer"><i class="fa fa-angle-down"></i> Positive influence</p>
              <div id="positive" style="display:none;">
                <li><text class="posToNeg">+3:</text> ${posList3}</li>
                <li><text class="posToNeg">+2:</text> ${posList2} </li>
                <li><text class="posToNeg">+1:</text> ${posList1}</li>
              </div>
              <p onclick="toggle('#neutral')" class="pointer"><i class="fa fa-angle-down"></i> No obvious influence</p>
              <div id="neutral" style="display:none;">
              <li><text class="posToNeg">0:</text> ${neuList}</li>
              </div>
              <p onclick="toggle('#negative')" class="pointer"><i class="fa fa-angle-down"></i> Negative influence</p>
              <div id="negative" style="display:none;">
                <li><text class="posToNeg">-3:</text> ${negList1}</li>
                <li><text class="posToNeg">-2:</text> ${negList2}</li>
                <li><text class="posToNeg">-1:</text> ${negList3}</li>
              </div>
              `



  //HÄMTA TARGET SOM AFFEKTAR ETT ANNAT TARGET POSITIVT/NEGATIVT/NEUTRALT
  // document.getElementById("name").innerHTML = "<h1>"+jsonList[id].Name+"</h1>" +;
  // document.getElementById("page1_container").innerHTML = "<h1>POSITIVE</h1>" + "</br>" + "<p>"+ posList + "</p>";
  // document.getElementById("page1_container").innerHTML = "<h1>NEUTRAL</h1>" + "</br>" + "<p>"+ neuList + "</p>";

  console.log(jsonList[id].Name);

}

var toggle = function(id) {
  $(id).slideToggle();
}
