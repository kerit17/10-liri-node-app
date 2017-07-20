// This section contains the variables for the node modules for this project
  var keyData = require('./keys.js');
  var Twitter = require('twitter');
  var Spotify = require('node-spotify-api');
  var request = require('request');
  var fs = require('fs');

  var apiCall = process.argv[2];
  var value = process.argv[3];

  //switch statement. If there is a match it will execute the function necessary.
  switch (apiCall) {
  case "showTweets":
    showTweets();
    break;
  case "showSpotify":
    showSpotify();
    break;
  case "showMovieDeets":
    showMovieDeets();
    break;
  case "doWhatItSays":
    doWhatItSays();
    break;
}

//function to grab the 20 most recent tweets and console log them
function showTweets(){
  var client = new Twitter(keyData.twitterKeys);
  var params = {screen_name: 'OGMerBean'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
      for (var key in tweets){
      console.log(tweets[key].text);
      }
    }
  });
};

//functiion to grab the song that was searched and console log the info on the song
function showSpotify(){
var spotifyClient = new Spotify(keyData.spotifyKeys);
spotifyClient.search({ type: 'track', query: (value || 'alabama Pines') , limit:3}, function(err, data) {
  if(!err){
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
  } else{
    console.log('Sorry! Try another jammin tune!');
  };
});
};

//function to search a movie title and console log the information about the movie
function showMovieDeets () {
    request('http://www.omdbapi.com/?apikey=40e9cece&t=' + ( value || 'Rudy') + `&tomatoes=true`, function (error, response, body) {
      var movieObj = JSON.parse(body);
      if (movieObj.Title === undefined && movieObj.Plot === undefined) {
        console.log("I didn't find that one, please try a different title.");
      }
      else {
        console.log("Your movie Selection: ");
        console.log("Title: " + movieObj.Title);
        console.log("Year: " + movieObj.Year);
        console.log("Rating: " + movieObj.Rated);
        console.log("Country Produced In: " + movieObj.Country);
        console.log("Language: " + movieObj.Language);
        console.log("Plot: " + movieObj.Plot);
        console.log("Actors/Actresses: " + movieObj.Actors);
        console.log("Rotten Tomatoes URL: " + movieObj.tomatoURL);
      }
    });
  };

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }
  var dataArr = data.split(",");
  if (dataArr[0] === 'showSpotify'){
    showSpotify(dataArr[1]);
  };
});
}