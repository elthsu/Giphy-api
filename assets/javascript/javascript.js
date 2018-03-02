$( document ).ready(function() {
    var rappers = ["Jay Z", "Kanye West", "Drake", "Nas", "2pac", "Dr.Dre",];
   
    function displayGifButtons(){
        $("#gifButtonsView").empty(); 
        for (var i = 0; i < rappers.length; i++){
            var gifButton = $("<button>");
            gifButton.addClass("rapper");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", rappers[i]);
            gifButton.text(rappers[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
  
    function addNewButton(){
        $("#addGif").on("click", function(){
        var rappers = $("#rapper-input").val().trim();
        if (rappers == ""){
          return false; 
        }
        actions.push(action);
    
        displayGifButtons();
        return false;
        });
    }
 
    function removeLastButton(){
        $("removeGif").on("click", function(){
        rappers.pop(action);
        displayGifButtons();
        return false;
        });
    }

    function displayGifs(){
        var rappers = $(this).attr("data-name");
        
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=VK2U4OMfJWTTM1Tryw6JTK9McMnHDYaj&q="+rappers+"&limit=10&"

        console.log(queryURL); 
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        .done(function(response) {
            console.log(response); 
            $("#gifsView").empty(); 
            var results = response.data; 
            if (results == ""){
              alert("There isn't a gif for this selected button");
            }
            for (var i=0; i<results.length; i++){
    
                var gifDiv = $("<div>"); 
                gifDiv.addClass("gifDiv");
                
                var gifRating = $("<p>").text("Rating: " + results[i].rating);
                gifDiv.append(gifRating);
           
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
                gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
                gifImage.attr("data-state", "still"); 
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    
    displayGifButtons(); 
    addNewButton();
    removeLastButton();
    
    $(document).on("click", ".rapper", displayGifs);
    $(document).on("click", ".image", function(){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
    });

