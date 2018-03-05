
var getMemberInfo = function() {
  $.getJSON("data/member_info.json", function(json_m){
    var text = "";
    var member_info_list = [];
    // console.log(json_m)
    for (var i in json_m) {
      member_info_list = json_m[i];

      text += `<div class="memberInfoBox">
      <img src="${member_info_list.image}"></img>
      <div class="lynn" style="float:left; text-align:left;">
      <br>
      <p>${member_info_list.name}</p>
      <p>email: <a href="">${member_info_list.email}</a></p>
      <p>Role:${member_info_list.role}</p>
      </div></div>`

      $(".memberContainer")[0].innerHTML = text;

      // console.log(member_info_list);
    }

});
}