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
    if(filter.split(": ")[1] == targetKey.toUpperCase()){
      targetClick(targetObj);
    }
  }
}

function getOptions(name){
  // console.log("here");
  $("#browsers").empty();
  if(name == "sweden"){
    $("#browsers").append(`
      <option value="1.3: Social protection">
      <option value="1.5: Economic and social resilience">
      <option value="2.2: Malnutrition">
      <option value="3.4: Non-communicable disease">
      <option value="3.8: Health coverage">
      <option value="4.1: Primary and secondary education">
      <option value="4.4: Technical/vocational skills">
      <option value="5.4: Unpaid/domestic work">
      <option value="5.5: Women’s participation">
      <option value="6.5: Water resources management">
      <option value="6.6: Water-related ecosystems">
      <option value="7.2: Renewable energy">
      <option value="7.3: Energy efficiency">
      <option value="8.5: Employment">
      <option value="8.4: Resource efficiency">
      <option value="9.4: Infrastructure">
      <option value="9.5: Research/development">
      <option value="10.1: conomic equality">
      <option value="10.7: igration">
      <option value="11.1: ffordable housing">
      <option value="11.2: ransport">
      <option value="12.1: ustainable consumption/production">
      <option value="12.5: aste">
      <option value="13.1: limate change adaptation">
      <option value="13.2: limate change policy/planning">
      <option value="14.1: arine pollution">
      <option value="14.4: ishery">
      <option value="15.2: orests">
      <option value="15.5: iodiversity">
      <option value="16.4: llicit financial/arms flow">
      <option value="16.6: ffective institutions">
      <option value="17.11: ports from developing countries">
      <option value="17.13: croeconomic stability">`)
  } else if(name == "mongolia"){
    $("#browsers").append(`
        <option value="1: Protection of water">
        <option value="2: Drinking water supply">
        <option value="3: Develop livestock farming">
        <option value="4: Increase soil fertility">
        <option value="5: Toursim sector">
        <option value="6: Food industry">
        <option value="7: Chemical industrial sector">
        <option value="8: Renewable energy">
        <option value="9: Green urban development">
        <option value="10: Perserve biodiversity">
        <option value="11: Urban planning & waste management">
        <option value="12: Climate change capacity">
        <option value="13: Extractive industries">
        <option value="14: Social welfare system">
        <option value="15: Maternal & child mortality">
        <option value="16: Accountable governance structures">
        <option value="17: Leadership of civil service">`)
  }
  // Object.keys(json).forEach(function(key){
  //   $("#browsers").append(`<option value="${json[key].Name}">`)
  // })
}
