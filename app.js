
$(document).ready(function() {

    var animalArray = ["cats", "dogs", "pigs"];

    function renderButtons() {

        $("#animalIcons").empty();
        for (var i = 0; i < animalArray.length; i++) {
          var a = $("<button>");
          a.addClass("btn btn-info");
          a.attr("type", "button");
          a.attr("data-name", animalArray[i]);
          a.text(animalArray[i]);
          $("#animalIcons").append(a);
        }

        $(".btn").on("click", function() {
            $("#animal-row").empty();
            event.preventDefault();
            var animal = $(this).attr("data-name");
    
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=g06SMRYEUnHX7eXChQkxF6Ukkeov2Dgp&q=" + animal + "&limit=" + 10 + "&offset=0&" + "Y" + "=Y&lang=en";
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                gifArray = Object.values(response.data);
                ratingsArray = [];
                animateURLArray = [];
                stillURLArray = [];
                for (var i=0; i < 10; i++) {
                    ratingsArray.push(gifArray[i].rating);
                    animateURLArray.push(gifArray[i].images.fixed_width_small.url);
                    stillURLArray.push(gifArray[i].images.fixed_width_small_still.url);
                }
            
                var animalRow = $("#animal-row");
                
    
                for (var i=0; i < 10; i++) {
                    var animalDiv = $("<div class='col-sm-4'>");
                    var rating = $("<p>").text("Rating: " + ratingsArray[i]);
                    var image = $("<img>").attr("src", animateURLArray[i]).attr("data-state", "animate").attr("still-URL", stillURLArray[i]).attr("animate-URL", animateURLArray[i]);
                    image.addClass("gif");
             
                    animalDiv.append(rating);
                    animalDiv.append(image);
                    animalRow.append(animalDiv);
                }

                $(".gif").on("click", function() {

                    var state = $(this).attr("data-state");
                    var stillURL = $(this).attr("still-URL");
                    var animateURL = $(this).attr("animate-URL");
                    
                    if (state === "animate") {
                        $(this).attr("data-state", "still");
                        $(this).attr("src", stillURL);

                    }  else if (state === "still") {
                        $(this).attr("data-state", "animate");
                        $(this).attr("src", animateURL);
                    }  
                });            
    
            });
    
        }); 
      };

    renderButtons();


    $("#submit").on("click", function() {
        event.preventDefault();
        var newAnimal = $("#animal-form").find("#new-animal").val();
        animalArray.push(newAnimal);
        renderButtons();
    });
      


    


});

