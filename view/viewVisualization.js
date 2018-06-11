$("#viewVis")[0].innerHTML = `<div id="page2" class="page">
<div id="legendColor" style="position:absolute;">
<p class="showLegend pointer" onclick="toggle('#legend')" style="text-align:left;"><i class="legendButton fa fa-chevron-down" style="font-size:1.25em"></i> Legend</p>
<div class="legend border-dark text-left d-flex flex-row justify-content-start vertical-padding">
<div class="row" id="legend" style="float:left;bottom:10%;left:1;padding-left:20px;">
</div>
<!-- LEGEND GRAPH GOES HERE -->
</div>
</div>
    <div class="container" id="container">
      <div class="container-viz">
    </div>


      <div class="col">
        <div class="border-dark text-left d-flex vertical-padding">
          <div id="boxDescription">
          </div>
        </div>
      </div>
    </div>




    <div id="columns" style="display: none">
    </div>
    <div id="tooltip" class="hidden">
      <p><strong><span id="tooltipText"></span></strong></p>
    </div>
    
    <div id="secondOrderDiv" style="display: none">
      <table class="table table-bordered bg-light m-0">
        <thead>
          <tr class="text-light h4 m-0" style="background-color: #7A7A79;">
            <th colspan=2 class="text-left" id="secondOrderTitle">Second Order Influence</th>
          </tr>
          <tr>
            <th scope="col" style="width: 35%">target name</th>
            <th scope="col" style="width: 65%">total influence</th>
          </tr>
        </thead>
        <tbody id="barTargets">
        </tbody>
      </table>

      <div id="secondOrder"></div>

      <div id="chart">
        <table class="table table-bordered bg-light m-0">
          <thead>
            <tr class="text-light h4 m-0" style="background-color: #7A7A79;">
              <th class="text-left" id="radarTitle">Multiple Targets Influence</th>
            </tr>
          </thead>
        </table>
        <div class="container" id="selectedTargetsRadar">
          
        </div>
      </div>
    </div>
  </div>`;
