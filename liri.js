//variables: data from keys
var key = require("./keys.js");
var Twitter = require("twitter");
var twitter = new Twitter(key.twitterKeys);
var Spotify = require("node-spotify-api");
var spotify = new Spotify(key.spotifyKeys);
var request = require("request");
var fs = require("fs");
var x = "";
var random = fs.readFile("./random.txt");

//variables: api calls
var api = process.argv[2];
var value = process.argv[3];

console.log(process.argv);
// console.log(spotify);
// console.log(Twitter);
// console.log(request);
//switch-case statement: direct which function to run
switch (api) {
	case "my-tweets": myTweets();
		break;
	case "spotify-this-song":
		if (x) {spotifyThisSong(x)};
		{spotifyThisSong("The Sign")};
		break;
	case "movie-this": movieThis();
		break;
	case "do-what-it-says": doWhatItSays();
		break;
}

//if node liri.js my-tweets is called
function myTweets(){
	var parameters = {screen_name: 'K85281610'};
	twitter.get("statuses/user_timeline", parameters, function(error, tweets, response){
		if (!error){
			console.log(my-tweets);
			for (var key in tweets){
				console.log(tweets[key].text);
			}
		}
	});
};

//if node liri.js spotify-this-song '<song name here>'
function spotifyThisSong(song){
	spotify.search({type: 'track', query: 'song'}, function(error, data){
		if(!error){
			for(var i = 0; i < data.tracks.items.length; i++){
        		var songData = data.tracks.items[i];
		        //artist
		        console.log("Artist: " + songData.artists[0].name);
		        //song name
		        console.log("Song: " + songData.name);
		        //spotify preview link
		        console.log("Preview URL: " + songData.preview_url);
		        //album name
		        console.log("Album: " + songData.album.name);
		        console.log("-----------------------");
			}
		};
	});
};

//if node liri.js movie-this '<movie name here>'
function movieThis(movie){
	request("http://www.omdbapi.com/?t=" + (value || "Mr. Nobody") + "&y=&plot=short&apikey=40e9cece" + "&tomatoes=true",
		function (error, response, body){
			var movieJSON = JSON.parse(body);
			console.log(movieJSON);
			if (movieJSON.Title === undefined && movieJSON.Plot === undefined){
				console.log("Please try a different title");
			}
			else {
				console.log("Movie Title: " + movieJSON.Title);
				console.log("Year: " + movieJSON.Year);
				console.log("IMDB Rating: " + movieJSON.Rated);
				console.log("Produced in: " + movieJSON.Country);
				console.log("Language: " + movieJSON.Language);
				console.log("Plot: " + movieJSON.Plot);
				console.log("Actors: " + movieJSON.Actors);
				console.log("Rotten Tomatoes URL: " + movieJSON.tomatoURL);
			}
		})
};

//if node liri.js do-what-it-says
function doWhatItSays(error, data){
	fs.readfile("random.txt", function(error, data){
		if (error) {
			return console.log (error);
		}
		else{
			for (var i=0; i < data.length; i++) {
			if (parse(data[i])) {
				result
			};
			console.log(result);
		}
	}
	});
} 
