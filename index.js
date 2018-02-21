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
  var posList = [];
  var negList = [];
  var neuList = [];
  var tragetAffect = jsonList[id].affect
  console.log(tragetAffect);
  for (var i in tragetAffect) {
    if (tragetAffect[i] === 0){
      neuList.push(i);
      // console.log("Neutral" + i);
    }
    else if (tragetAffect[i] < 0){
      negList.push(i);
      // console.log("Negative" + i);
    }
    else if (tragetAffect[i] > 0){
      posList.push(i);
      // console.log("Positive" + i);
    }
  }
  $("#boxDescription")[0].innerHTML = `<p>Name: ${jsonList[id].Name}</p>
              <p>Description:</p>
              <p>Column sum:</p>
              <h4>Affects on other targets</h4>
              <p onclick="toggle('#positive')"> + Positive influence</p>
              <div id="positive" style="display:none;">
                <p>+3: ${posList}</p>
                <p>+2: </p>
                <p>+1: </p>
              </div>
              <p onclick="toggle('#neutral')">No obvious influence</p>
              <div id="neutral" style="display:none;">
              <p>0: ${neuList}</p>
              </div>
              <p onclick="toggle('#negative')"> - Negative influence</p>
              <div id="negative" style="display:none;">
                <p>-1: ${negList}</p>
                <p>-2: </p>
                <p>-3: </p>
              </div>
              `
  //HÄMTA TARGET SOM AFFEKTAR ETT ANNAT TARGET POSITIVT/NEGATIVT/NEUTRALT
  // document.getElementById("name").innerHTML = "<h1>"+jsonList[id].Name+"</h1>" +;
  // document.getElementById("page1_container").innerHTML = "<h1>POSITIVE</h1>" + "</br>" + "<p>"+ posList + "</p>";
  // document.getElementById("page1_container").innerHTML = "<h1>NEUTRAL</h1>" + "</br>" + "<p>"+ neuList + "</p>";

  console.log(jsonList[id].Name);

}

var toggle = function(id) {
  $(id).toggle();
}
