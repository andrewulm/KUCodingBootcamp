// SETUP VARIABLES
// ==========================================================

var authKey = "088a4b9c208043f7b118fac8af871240";

var searchTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey + "&q=";

var articleCounter = 0;

// FUNCTIONS
// ==========================================================

function runQuery(NYTArticles, queryURL) {

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(NYTInfo) {

        console.log("------------------------------------");
        console.log("URL: " + queryURL);
        console.log("------------------------------------");

        console.log(NYTInfo);
        console.log("------------------------------------");

        for (var i = 0; i < NYTArticles; i++) {
            articleCounter++;

            var spotPlace = $("<div>");
            spotPlace.addClass("spot");
            spotPlace.attr("id", "article-spot-" + articleCounter);
            $("#spot-section").append(spotPlace);

            if (NYTInfo.response.docs[i].headline !== "null") {
                $("#article-spot-" + articleCounter)
                    .append(
                        "<h3 class='articleHeadline'><span class='label label-primary'>" +
                        articleCounter + "</span><strong> " +
                        NYTInfo.response.docs[i].headline.main + "</strong></h3>"
                    );

                console.log(NYTInfo.response.docs[i].headline.main);
            }

            if (NYTInfo.response.docs[i].byline && NYTInfo.response.docs[i].byline.original) {
                $("#article-spot-" + articleCounter)
                    .append("<h5>" + NYTInfo.response.docs[i].byline.original + "</h5>");

                console.log(NYTInfo.response.docs[i].byline.original);
            }

            $("#articleSpot-" + articleCounter)
                .append("<h5>Section: " + NYTInfo.response.docs[i].section_name + "</h5>");
            $("#articleSpot-" + articleCounter)
                .append("<h5>" + NYTInfo.response.docs[i].pub_date + "</h5>");
            $("#articleSpot-" + articleCounter)
                .append(
                    "<a href='" + NYTInfo.response.docs[i].web_url + "'>" +
                    NYTInfo.response.docs[i].web_url + "</a>"
                );

            console.log(NYTInfo.response.docs[i].pub_date);
            console.log(NYTInfo.response.docs[i].section_name);
            console.log(NYTInfo.response.docs[i].web_url);
        }
    });

}

// METHODS
// ==========================================================

$("#_submitButton").on("click", function(event) {
    event.preventDefault();

    articleCounter = 0;

    $("#spot-section").empty();

    searchTerm = $("#_searchTerm").val().trim();
    var queryURL = queryURLBase + searchTerm;

    numResults = $("#_recordsRetrieve").val();

    startYear = $("#_startyear").val().trim();

    endYear = $("#_endyear").val().trim();

    if (parseInt(startYear)) {
        queryURL = queryURL + "&begin_date=" + startYear + "0101";
    }

    if (parseInt(endYear)) {
        queryURL = queryURL + "&end_date=" + endYear + "0101"}

    runQuery(numResults, queryURL);
});