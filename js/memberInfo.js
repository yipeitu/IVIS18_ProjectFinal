
var getMemberInfo = function() {
  $.getJSON("data/member_info.json", function(json_m){
    var text = "";
    var member_info_list = [];
    // console.log(json_m)
    for (var i in json_m) {
      member_info_list = json_m[i];
      if(i % 4 == 0) {
        if(i != 0) {
          text += `</div>`
        }
        text += `<div class="row">`
      }

      // text += `
      // <div class="col">
      //   <div class="card">
      //     <img src="${member_info_list.image}"></img>
      //     <div class="cardinfo-container">
      //       <h2>${member_info_list.name}</h2>
      //       <p class="role">${member_info_list.role}</p>
      //       <p>E-mail: <a href="mailto:${member_info_list.email}">${member_info_list.email}</a></p>
      //     </div>
      //   </div>
      // </div>`
      text += `
      <div class="col">
        <div class="card">
          <div class="bgImg" style="background-image: url('${member_info_list.image}')"></div>
          <div class="cardinfo-container">
            <h2>${member_info_list.name}</h2>
            <p class="role">${member_info_list.role}</p>
            <p>E-mail: <a href="mailto:${member_info_list.email}">${member_info_list.email}</a></p>
          </div>
        </div>
      </div>`

      // <div class="figure-img img-fluid rounded csImg" style="background-image: url('${dish[2]}')"></div>
      $(".memberContainer")[0].innerHTML = text;

      // console.log(member_info_list);
    }

});
}
