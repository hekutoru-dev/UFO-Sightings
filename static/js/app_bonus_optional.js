// from data.js
var tableData = data;

var submit = d3.select('#filter-btn');

submit.on("click", function( ) {
    
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select Table Body element.
    var tbody = d3.select("tbody");
    // Remove all table cells.
    d3.selectAll('td').remove();
    
    // Select the input DATETIME and get the raw HTML node
    var inputDatetime = d3.select('#datetime-input');
    // Get the value property of the input element
    var valueDatetime = inputDatetime.property('value');
    // console.log(valueDatetime); // Confirm value read is correct.

    // Select the input COUNTRY and get the raw HTML node
    var inputCountry = d3.select('#country-input');
    // Get the value property of the input element
    var valueCountry = inputCountry.property('value');
    // console.log(valueCountry); // Confirm value read is correct.

    // Select the input SHAPE and get the raw HTML node
    var inputShape = d3.select('#shape-input');
    // Get the value property of the input element
    var valueShape = inputShape.property('value');
    // console.log(valueShape); // Confirm value read is correct.

    // GET the filtered options from the input  
    var filteredDatetime = tableData.filter(dateSighting => dateSighting.datetime === valueDatetime);
    var filteredCountry = tableData.filter(countrySighting => countrySighting.country === valueCountry);
    var filteredShape = tableData.filter(shapeSighting => shapeSighting.shape === valueShape);


    // FILTERING MULTIPLE
    if (filteredDatetime.length > 0) {
      filteredAll = filteredDatetime;
    }

    if (filteredCountry.length > 0) {
      if (filteredDatetime.length > 0) {
        filteredAll = filteredAll.filter(citySighting => citySighting.country === valueCountry);
      } else {
        filteredAll = filteredCountry;
      }
    }

    if (filteredShape.length > 0) {
      if ((filteredDatetime.length > 0 && filteredCountry.length > 0) || (filteredDatetime.length > 0 || filteredCountry.length > 0 ) ) {
        filteredAll = filteredAll.filter(citySighting => citySighting.shape === valueShape);     
      } else {
        filteredAll = filteredShape;
      }     
    } 


    if (filteredAll.length === 0) {
      // Display a not found results message
      d3.select('.filter-results').text('No results were found matching your criteria');
    } else {
      d3.select('.filter-results').text('UFO Sightings Results Found');
      filteredAll.forEach((datetime) => {
        var row = tbody.append("tr");
        Object.entries(datetime).forEach(([key, value]) => {
          var cell = tbody.append("td");
          cell.text(value);
        });
      });
    } // END if filter data (for MESSAGE results)

}); // END on-click function for filter data button.