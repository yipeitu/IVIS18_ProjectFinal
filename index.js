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
  $("#boxDescription")[0].innerHTML = `<div>name:${jsonList[id].Name}</div>
              <div>description:${posList}</div>
              <div>row sum:</div>
              <div>column sum:</div>
              <div> + positive influence</div>
              <div>+3:</div>
              <div>+2:</div>
              <div>+1:</div>
              <div> - negative influence</div>
              <div>-1:</div>
              <div>-2:</div>
              <div>-3:</div>
              <div>no obvious influence</div>
              <div>0:</div>`
  //HÄMTA TARGET SOM AFFEKTAR ETT ANNAT TARGET POSITIVT/NEGATIVT/NEUTRALT
  // document.getElementById("name").innerHTML = "<h1>"+jsonList[id].Name+"</h1>" +;
  // document.getElementById("page1_container").innerHTML = "<h1>POSITIVE</h1>" + "</br>" + "<p>"+ posList + "</p>";
  // document.getElementById("page1_container").innerHTML = "<h1>NEUTRAL</h1>" + "</br>" + "<p>"+ neuList + "</p>";

  console.log(jsonList[id].Name);

}
