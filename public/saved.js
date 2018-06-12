// Grab the articles as a json
$.get("/articles", function (data) {
    // For each one
    console.log(data);

    for (let i = 0; i < data.length; i++) {

        var article = $("<div>");
        var title = $("<a>");
        var noteArea = $("<div>");
        var noteInput = $("<input>");
        var save = $("<button>");

        article.addClass("article");

        title.addClass("article-title");
        title.attr("href", data[i].link);
        title.text(data[i].title);
        article.append(title);

        noteArea.addClass("article-note-area");
        noteArea.text("Notes:");
        noteArea.attr("data-id", data[i]._id);
        article.append(noteArea);

        noteInput.addClass("article-note-input");
        noteInput.attr("data-id", data[i]._id);
        article.append(noteInput);

        save.addClass("note-save");
        save.text("Save/Update Note");
        save.attr("data-id", data[i]._id);
        article.append(save);

        $("#articles").append(article);

    }
});

// When you click the savenote button
$(document).on("click", ".note-save", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    console.log(thisId);
    var note = "some note";

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
            note: note
        }
    })
        // With that done
        .then(function (data) {
            // Log the response
            console.log(data);
            // Empty the notes section
            // $(".article-note-area").data(thisId).text(note);
        });

    // Also, remove the values entered in the input and textarea for note entry
    $(".article-note-input").val("");
});
