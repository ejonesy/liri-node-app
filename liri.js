var dotenv = require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var getTweets = function() {
    var params = {screen_name: 'eveonice'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    //console.log(JSON.stringify(data, null, 0));
    if (!error) {
    for (i=0; i<2; i++){
        console.log(tweets[i].text);
        console.log(tweets[i].created_at);
            }
        }
    })
}

var search = process.argv[3];

var getTunes = function(searchSong) {
    spotify.search({ type: 'track', query: searchSong, limit: 3}, function(err, data) {
        //console.log(JSON.stringify(data, null, 0));
        if (err) {
        return console.log(err);
        }
        if (searchSong === undefined) {
            searchSong === "I Want it That Way";
        }
        if (!err) {
        console.log("Song: " + searchSong);
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);

        //Album titles did not seem to be available in the JSON
        //console.log("Album: " + data.tracks.items[0].album);

        console.log("Preview Link: " + data.tracks.items[0].album.artists[0].external_urls.spotify);
        }
    });
}

var getFilm = function() {

    if (process.argv[3] === undefined) {
        movie = "Mr. Nobody"
    }
    var query = "http://www.omdbapi.com/?t="
    var movie = process.argv[3];
    var key = "&y=&plot=short&apikey=trilogy"
    var mQuery = query + movie + key;

    
    request(mQuery, function(error, response, body) {            
        
        //console.log(JSON.stringify(response, null, 0));
        if (!error && response.statusCode === 200) {
            var jsonData = JSON.parse(body);
            //console.log(jsonData)
            console.log("Title: " + jsonData.Title, "\nYear: " +  jsonData.Year, "\nImdb rating: " + jsonData.imdbRating, "\nCountry: " + jsonData.Country, "\nLanguages: " + jsonData.Language, "\nStarring: " + jsonData.Actors, "\nSynopsis: " + jsonData.Plot);
        }
    });
    
}

//Unsure how to get this function working
var doIt = function() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr[1]);
        getTunes(dataArr[1]);
    });
}

if (process.argv[2] === "my-tweets") {
    getTweets();
}

else if (process.argv[2] === "spotify-this-song") {
    getTunes(search);
}

else if (process.argv[2] === "movie-this") {
    getFilm();
}
else if (process.argv[2] === "do-what-it-says") {
    doIt();
    //getTunes(search);
}
