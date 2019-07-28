// from data.js
var tableData = data;

var submit = d3.select('#filter-btn');

// YOUR CODE HERE!
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

    // GET the filtered options from the input
    var filteredDatetime = tableData.filter(dateSighting => dateSighting.datetime === valueDatetime);
  
    console.log("Filtering Datetime");
    console.log(filteredDatetime);

    if (filteredDatetime.length === 0) {
      // Display a not found results message
      d3.select('.filter-results').text('No results were found matching your criteria');
    } else {
      // Display normal message.
      d3.select('.filter-results').text('UFO Sightings');

      filteredDatetime.forEach((datetime) => { 
        var row = tbody.append("tr");
        Object.entries(datetime).forEach(([key, value]) => {
          var cell = tbody.append("td");
          cell.text(value);
        });
      });
    } // END if filtered table results MESSAGE

}); // END on-click function for filter data button.