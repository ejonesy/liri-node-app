require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var Twitter = require('twitter')

//var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);

var getTweets = function() {
    var params = {screen_name: 'eveonice'};
    client.get('statuses/user_timeline', params, function(error, tweets, response)     {
        console.log(JSON.stringify(tweets, null, 0));

        if (!error) {
        for (i=0; i<20; i++){
            //console.log(JSON.parse(tweets).text);
                }
            }
        })
};

getTweets();


// fs.readFile("keys.js", "utf8", function(error, data){
//     if (error) {
//         return console.log(error);
//     }

//     console.log(data);
//     var dataArr = data.split(",");
//     console.log(dataArr);
// })
