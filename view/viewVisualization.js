$("#viewVis")[0].innerHTML = `<div id="page2" class="page">
    <div class="row" style="align:center;">
      <div class="col">
        <h1>This is the visualization page</h1>
      </div>
      <br><br><br><br>
    </div>
    <div class="row parent">
      <div class="col-md-7 container-viz">
      </div>


      <div class="col">
        <div class="legend border-dark text-left d-flex flex-row justify-content-start vertical-padding">
          <div class="row" id="legend" style="float:left;">
            <!-- LEGEND GRAPH GOES HERE -->
          </div>
        </div>
        <div class="border-dark text-left d-flex flex-row justify-content-end vertical-padding">

          <div id="boxDescription">
            
          </div>
        </div>

      </div>
    </div>
    <div id="columns" style="display: none">
    </div>
  </div>`;