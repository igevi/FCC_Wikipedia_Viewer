// jQuery
$(document).ready(function() {
  // when 'Search' button is clicked, do the following:
  $("#search").click(function() {
    // get the search text
    var searchText = $("#search-term").val();
    // API URL containing search text
    var url =
      "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
      searchText +
      "&format=json&callback=?";

    $.ajax({
      type: "GET",
      url: url,
      async: false,
      dataType: "json",
      success: function(data) {
        // heading: data[1][0]
        // description: data[2][0];
        // link: data[3][0];
        $("#search-results").html("");
        // if no results are given (response === undefined), display 'no results found'
        if (data[1][0] === undefined) {
          $("#search-results").html(
            "<p class='no-results'>" + "No Results Found" + "</p>"
          );
        } else {
          for (var i = 0; i < data.length; i++) {
            $("#search-results")
              .prepend(
                "<li class='result-item'><a target='blank' href=" +
                  data[3][i] +
                  ">" +
                  data[1][i] +
                  "</a><p>" +
                  data[2][i] +
                  "</p></li>"
              )
              .hide()
              .fadeIn("fast");
          }
        }
        $("#search-term").val("");
      },
      error: function(errorMessage) {
        console.log("Error!");
      }
    });
  });

  // allow search when return key is pressed
  $("#search-term").keypress(function(e) {
    if (e.which == 13) {
      $("#search").click();
    }
  });
});
