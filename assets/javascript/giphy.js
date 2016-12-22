
$(document).ready(function(){
 	
 	// $('#video').hide();
 	var rate; //had to declare the rate variable out here in order to get rid of the uncaught reference error.
	var topics = ['Funny Game Glitches', 'Best Game Glitches', 'FAIL', 'Best FAIL', 'Funny FAIL'];


	function moveGiphies()
	{
		$(this).addClass('fixed');
		var imageMove = $(this).data('move');
		console.log(imageMove);
		// var imageTwo = $(this).attr("src", imageMove);
		// console.log(imageTwo);
		$(this).attr('src', imageMove);
	}

	function stopGiphies()
	{
		$(this).removeClass('fixed');
		var imageStop = $(this).data('still');
		console.log(imageStop);
		// var imageThree = $(this).attr("src", imageStop);
		// console.log(imageThree);
		$(this).attr('src', imageStop);
	}
 
	function displayGiphies()
	{
		var giff = $(this).attr('data-name');
		// var queryURL = "https://api.giphy.com/v1/gifs/search?q=";//The length 
		//of the array here is the size of the whatever "limit" is equal to. In this case 30
		var queryURL = "https://api.giphy.com/v1/gifs/search";
		queryURL += '?' + $.param({
		  'api_key': "dc6zaTOxFJmzC",
		  'q': giff,
		  'limit': 30,
		  'rating': "pg"
		});

		console.log(queryURL);
		
		$('#Giphies').empty();

		$.ajax({url: queryURL, method: 'GET'}).done(function(response) 
		{
			for (var x = 0; x < 10; x++)
			{
				var giphyDiv = $('<div class="gifDiv">');

				rate = response.data[x].rating.toUpperCase();

				var pOne = $('<p>').text( "Rating: " + rate);
		
				giphyDiv.append(pOne);
				var image = $('<img>').attr("src", response.data[x].images.fixed_height_still.url);
				image.attr('id', 'gifImage');
				image.data('move', response.data[x].images.fixed_height.url);
				image.data('still', response.data[x].images.fixed_height_still.url);
			
				giphyDiv.prepend(image);

				$('#Giphies').prepend(giphyDiv);
			}
		});

	}

	function renderButtons()
	{ 
		$('#buttonsView').empty();
		
		for (var i = 0; i < topics.length; i++)
		{
		    var a = $('<button>');
		    a.addClass('giphy');
		    a.attr('data-name', topics[i]);
		    a.text(topics[i]);
		    $('#buttonsView').append(a);
		}
	}

	$('#addGiphy').on('click', function(){

		var searchedGif = $('#search-input').val().trim();

		topics.push(searchedGif);
		
		renderButtons();

		return false;
	})


	$(document).on('click', '.giphy', displayGiphies);
	$(document).on('click', '#gifImage', moveGiphies);
	$(document).on('click', '.fixed', stopGiphies);

	renderButtons();

});


