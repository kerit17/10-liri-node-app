//variables: data from keys
var key = require("./keys.js");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(key.spotifyKeys);
var request = require("request");
var fs = require("fs");
var x = "";

//variables: api calls
var api = process.argv[2];
var value = process.argv[3];

console.log(process.argv);
console.log(spotify);
//switch-case statement: direct which function to run
switch (api) {
	case "myTweets": myTweets();
		break;
	case "spotify-this-song":
		if (x) {spotifyThisSong(x)};
		{spotifyThisSong("The Sign")};
		break;
	case "movieThis": movieThis();
		break;
	case "doWhatItSays": doWhatItSays();
		break;
}

//if node liri.js my-tweets is called


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
}