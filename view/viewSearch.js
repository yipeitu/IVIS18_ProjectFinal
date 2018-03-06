$(".search-container").append(`<form class="form-inline"><input class="form-control" list="browsers" type="text" id="myInput" onkeyup="whichKey(event)" placeholder="Search for target..">
   <datalist id="browsers">
   </datalist>
   <button class="btn btn-outline" type="button" onclick="searchFunction()">Submit</button></form>`)
