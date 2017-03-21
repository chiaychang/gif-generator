// Initial array of summer items
var summerArray = ["Sun Tan","Pug on the Beach","Summer","Pina Colada","Surfing","Bikini"];
var audio = new Audio("assets/The Shins Australia.mp3");

$(document).ready(function() {


// Function for displaying items stored in summerArray as buttons 
function renderButtons() {

        // Clearning the #buttons div prior to adding new items
        $("#buttons").empty();

        // Looping through the summerArray
        for (var i = 0; i < summerArray.length; i++) {

          var newButton = $("<button>");
          newButton.addClass("btn btn-info");
          newButton.addClass("summerBtn");
          newButton.attr("data-name", summerArray[i]);
          newButton.text(summerArray[i]);
          $("#buttons").append(newButton);
        }
      };


//when click on summerArray buttons, trigger request to Giphy API
 $(document).on("click", ".summerBtn", function(event){
  
       $("#gifs").empty();
//seting the URL/end-point for Giphy API
//search term changes dinamically when click on $(this)/different buttons
      var summerItem = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        summerItem + "&api_key=dc6zaTOxFJmzC&limit=10";

//getting response/JSON from Giphy API
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {

//load the response as an object
          console.log(response);

          var results = response.data;
               
//get the data I need from the response to display on the page
		          for (var i = 0; i < results.length; i++) {

		            var gifDiv = $("<div class='item'>");
		            var rating = results[i].rating.toUpperCase();
		            var p = $("<span class='rating'>Rating: "+ rating +"</span>");
		            var gifImage = $('<img class= "images" src="'+results[i].images.fixed_height_still.url+'">');
		            gifImage.attr("active-gif",results[i].images.fixed_height.url);
		            gifImage.attr("data-state","still");
		            gifImage.attr("still-gif",results[i].images.fixed_height_still.url);
		            gifDiv.prepend(p);
		            gifDiv.prepend(gifImage);
		            $("#gifs").prepend(gifDiv);
		          }
		        });
    });

          
  //gif would move/stand still when click  
 $(document).on("click", ".images", function(event){
      
       var state = $(this).attr("data-state");
       console.log(state);

   if(state==="still"){
   	  $(this).attr("data-state","active");
   	  $(this).attr("src", $(this).attr("active-gif"));
   }

   else if(state==="active"){
     $(this).attr("data-state","still");
     $(this).attr("src", $(this).attr("still-gif"));
   }
  
 });
   


//push a new item to the summarArray when submit button is clicked
$("#submit-btn").on("click", function(event) {
        event.preventDefault();

        var newItem = $("#summer-input").val().trim();
        summerArray.push(newItem);

        renderButtons();
      });

//render buttons when page first loaded
renderButtons();

     });

// make some waves.
var ocean = document.getElementById("ocean"),
    waveWidth = 10,
    waveCount = Math.floor(window.innerWidth/waveWidth),
    docFrag = document.createDocumentFragment();

for(var i = 0; i < waveCount; i++){
  var wave = document.createElement("div");
  wave.className += " wave";
  docFrag.appendChild(wave);
  wave.style.left = i * waveWidth + "px";
  wave.style.webkitAnimationDelay = (i/100) + "s";
}

ocean.appendChild(docFrag);
audio.play();


