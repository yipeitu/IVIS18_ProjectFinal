$(".search-container").append(`<input list="browsers" type="text" id="myInput" onkeyup="whichKey(event)" placeholder="Search for target..">
   <datalist id="browsers">
   </datalist>
   <input type="submit" onclick="searchFunction()">`)