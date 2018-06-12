
$.get("/scrape", function (data) {
    console.log(data);
});
$.get("/articles", function (data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {

        var article = $("<div>");
        var title = $("<a>");
        var noteArea = $("<div>");
        var commentBtn = $("<button>");
        var noteInput = $("<input>");

        article.addClass("article");

        title.addClass("article-title");
        title.attr("href", data[i].link);
        title.text(data[i].title);
        article.append(title);

        noteArea.addClass("article-note-area");
        noteArea.text(data[i].note);
        noteArea.attr("data-id", data[i]._id);
        article.append(noteArea);

        noteInput.addClass("article-note-input");
        noteInput.attr("data-id", data[i]._id);
        article.append(noteInput);

        commentBtn.addClass("post-comment");
        commentBtn.text("Post a comment");
        commentBtn.attr("data-id", data[i]._id);
        article.append(commentBtn);

        $("#articles").append(article);

    }
});
//When you click the save article button
$(document).on("click", ".post-comment", function () {
    var id = $(this).attr("data-id");
    var text = $("input[data-id='" + id + "']").val();
    console.log(text);
    $("div[data-id='" + id + "']").text(text);

    $.ajax({
        method: "POST",
        url: "/articles/" + id,
        data: {
            note: text
        }
    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
        });

    text = "";
});

