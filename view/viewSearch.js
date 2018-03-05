$(".search-container").append(`<input list="browsers" type="text" id="myInput" onkeyup="whichKey(event)" placeholder="Search for target..">
   <datalist id="browsers">
       <option value="Social protection">
       <option value="Economic and social resilience">
       <option value="Malnutrition">
       <option value="Food production/agriculture">
       <option value="Non-communicable disease">
       <option value="Health coverage">
       <option value="Primary and secondary education">
       <option value="Technical/vocational skills">
       <option value="Unpaid/domestic work">
       <option value="Women’s participation">
       <option value="Water resources management">
       <option value="Water-related ecosystems">
       <option value="Renewable energy">
       <option value="Energy efficiency">
       <option value="Resource efficiency">
       <option value="Employment">
       <option value="Infrastructure">
       <option value="Research/development">
       <option value="Economic equality">
       <option value="Migration">
       <option value="Affordable housing">
       <option value="Transport">
       <option value="Sustainable consumption/production">
       <option value="Waste">
       <option value="Climate change adaptation">
       <option value="Climate change policy/planning">
       <option value="Marine pollution">
       <option value="Fishery">
       <option value="Forests">
       <option value="Biodiversity">
       <option value="Illicit financial/arms flow">
       <option value="Effective institutions">
       <option value="Exports from developing countries">
       <option value="Macroeconomic stability">
   </datalist>
   <input type="submit" onclick="searchFunction()">`)