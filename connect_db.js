/*
This file includes functions to make calls to the MongoDB containing 
data about the SEI goals. All data is returned as JSON.

Last revision: 2018-02-20
*/

// Global variables
var url = "http://35.198.97.17:5000/";

// Make asynchronous http request
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

httpGetAsync(url, function(data) {
  data = JSON.parse(data);
  console.log(data);
  
  /*
  Do stuff with json data here
  
  TBD: Build functions to more easily make specific calls like:
  - getGoal(1.3)
  - affectedGoals(1.5)
  
  */
  
});


