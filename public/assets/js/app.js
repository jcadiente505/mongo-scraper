$(document).ready(() => {
    $(".show-articles").on("click", () => {
        $.get("/all/articles", (data) => {
            $("#articleContainer").empty();
            data.forEach(data => {
                if(!data || data.saved === true ) {
                    alert("looks like there were no new articles!")
                }
                else {
                    articleCardDisplay(data);
                }
            });
        });
    });

    $(document).on("click", "#saveArticle", saveArticle);


function articleCardDisplay(data) {
    // Function for display article data and generating a bootstrap card
    let card = "<div class='row'>";
    card += "<div class='col l12 s12'>";
    card += "<div class='card bg-light mb-3'>";
    card += "<div class='card-header'><a href=" + data.url + ">Liquor.com</a></div>";
    card += "<div class='card-body'>";
    card += "<h5 class='card-title'>" + data.headline + "</h5>";
    card += "<p class='card-text'>" + data.summary + "</p>";
    card += "<a class='btn btn-primary' href=" + data.url + "role='button'>View Article</a>"
    card += "<button id='saveArticle' data-id=" + data._id + " type='button' class='btn btn-success'>Save Article!</button>"
    card += "</div>";
    card += "</div>";
    card += "</div>";
    card += "</div>";

    // Append the new article card to the article section div
    $("#articleContainer").append(card);
}

function saveArticle() {
    var articleSaved = $(this).data("id")

    console.log(articleSaved)
    // articleSaved.saved = true;
    console.log(articleSaved);
    $.ajax({
        method: "PUT",
        url: "/save/article/" + articleSaved,
        data: articleSaved
      }).then(function(data) {
        // If the data was saved successfully
        if (data.saved) {
          // Run the initPage function again. This will reload the entire list of articles
          window.location.reload(true);
        }
      });
    }
});
