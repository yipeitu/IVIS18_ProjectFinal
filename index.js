// LYNNS CODE
$(document).ready(function(){
  // When page loads...:
  $("div.page").hide();
  $("nav li:first").addClass("current").show(); // Activate first page
  $("div.content div:first").show(); // Show first page content

  // On Click Event (within list-element!)
  $("nav div").click(function() {
    $("nav a").removeClass("current"); // Remove any active class
    $(this).addClass("current"); // Add "current" class to selected page

    $("div.page").hide(); // Hide all content

    // Find the href attribute value to identify the active page+content:
    var activePage = $(this).find("a").attr("href");
    $(activePage).show(); // Fade in the active page content
  }); // end click method

}); // end $(document).ready method

var jsonList;
$.getJSON("https://yipeitu.github.io/IVIS18_ProjectFinal/db_data.json", function(json){
    jsonList = json;
});

var targetPos = function(posList){
  var html3 = "<div>+3 :</div>";
  var html2 = "<div>+2 :</div>";
  var html1 = "<div>+1 :</div>";
  ["3", "2", "1"].forEach(function(index){
    switch(index){
      case "3":
        if(Object.keys(posList).indexOf(index) !== -1){
          html3 += `<div>${posList[index]+" "+jsonList[posList[index]].Name}</div>`;
        }
        break;
      case "2":
        if(Object.keys(posList).indexOf(index) !== -1){
          html2 += `<div>${posList[index]+" "+jsonList[posList[index]].Name}</div>`;
        }
        break;
      case "1":
        if(Object.keys(posList).indexOf(index) !== -1){
          html1 += `<div>${posList[index]+" "+jsonList[posList[index]].Name}</div>`;
        }
        break;
    }
  })
  return html3+html2+html1;
}

var targetNeg = function(negList){
  if(negList.length === 0) return;
  var html3 = "<div>-1 :</div>";
  var html2 = "<div>-2 :</div>";
  var html1 = "<div>-3 :</div>";
  ["1", "2", "3"].forEach(function(index){
    switch(index){
      case "1":
        if(Object.keys(negList).indexOf(index) !== -1){
          html3 += `<div>${negList[index]+" "+jsonList[negList[index]].Name}</div>`;
        }
        break;
      case "2":
        if(Object.keys(negList).indexOf(index) !== -1){
          html2 += `<div>${negList[index]+" "+jsonList[negList[index]].Name}</div>`;
        }
        break;
      case "3":
        if(Object.keys(negList).indexOf(index) !== -1){
          html1 += `<div>${negList[index]+" "+jsonList[negList[index]].Name}</div>`;
        }
        break;
    }
  })
  return html3+html2+html1;
}

var targetNeu = function(neuList){
  var html = "<div>0 :</div>";
  neuList.forEach(function(target){
    html += `<div>${target+" "+jsonList[target].Name}</div>`;
  })
  return html;
}

var getTarget = function(id){
  var posList = {};
  var negList = {};
  var neuList = [];
  var tragetAffect = jsonList[id].affect

  for (var i in tragetAffect) {
    if (tragetAffect[i] === 0){
      neuList.push(i);
    }
    else if (tragetAffect[i] < 0){
      if(Object.keys(negList).indexOf(tragetAffect[i]) === -1){
        negList[tragetAffect[i]] = [i];
      } else {
        negList[tragetAffect[i]].push(i);
      }
    }
    else if (tragetAffect[i] > 0){
      if(Object.keys(posList).indexOf(tragetAffect[i]) === -1){
        posList[tragetAffect[i]] = [i];
      } else {
        posList[tragetAffect[i]].push(i);
      }
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

$("#boxDescription")[0].innerHTML = `<div>name: ${jsonList[id].Name}</div>
            <div>description: ${jsonList[id].Description}</div>
            <div>row sum: ${jsonList[id].Sum}</div>
            <div>column sum: ${jsonList[id].Sum}</div>
            <div> + positive influence</div>
            ${targetPos(posList)}
            <div> - negative influence</div>
            ${targetNeg(negList)}
            <div>no obvious influence</div>
            ${targetNeu(neuList)}`;

var toggle = function(id) {
  $(id).toggle();
}
