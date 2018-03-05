// LYNNS CODE
// const SWEDEN = "db_data.json";
// const MONGOLIA = "data_mongolia.json";
const SWEDEN = "data_sweden.json";
const MONGOLIA = "data_mongolia.json";

var jsonFile = SWEDEN;
$(document).ready(function(){
  // When page loads...:
  // $("div.content").hide(); // Hide all content
  $("div.page").hide();
  $(".tabs div:first").addClass("current").show(); // Activate first page
  $("div.content div:first").show(); // Show first page content
  drawBall("structure_data5.json");
  getOptions();
  // On Click Event (within list-element!)
  $(".tabs div").click(function() {
    $(".tabs a").removeClass("current"); // Remove any active class
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
        // $(".container-viz").append("div");
        drawBall("structure_data5.json");
        getOptions();
        $("#boxDescription").empty();
        $("#columns").empty();
        jsonFile = SWEDEN;
        break;
      case "mongolia":
        $(".container-viz").empty();
        drawBall("structure_mongolia.json");
        getOptions();
        $("#boxDescription").empty();
        $("#columns").empty();
        jsonFile = MONGOLIA;
        break;
      default:
        break;
    }
  }); // end click method

}); // end $(document).ready method

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
