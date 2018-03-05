function whichKey(event){
  if(event.keyCode == 13){
    searchFunction();
  }
}

function searchFunction() {
  var input, filter;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();

  input.value = '';
  
  for (i = 0; i < node._parents[0].childElementCount; i++) {
    targetObj = node._parents[0].children[i].__data__;
    targetKey = targetObj.data.key;
    //console.log("filter: " + filter + " targetKey: " + targetKey.toUpperCase());
    if(filter == targetKey.toUpperCase()){
      targetClick(targetObj);
    }
  } 
}

function getOptions(){
  $("#browsers").empty()
  $.getJSON("data/"+jsonFile, function(json){
    Object.keys(json).forEach(function(key){
      $("#browsers").append(`<option value="${json[key].Name}">`)
    })
  })
}