require("dotenv").config();                                         //dotenv configuration initialization 

var Spotify = require('node-spotify-api');                          //Spotify package for running API calls
var Table = require('cli-table3');                                  //For making pretty tables in CLI
var keys = require("./keys.js");                                    //Spotify requirement
var moment = require("./moment.min.js");                            //Requires keys.js file to connect to API
var axios = require('axios');                                       //Axios for API requests
var fs = require('fs');                                             //fs for R/W/M files
var spotify = new Spotify(keys.spotify);                            //Creates new Spotify Object for using API
var command = process.argv[2].toLowerCase();                        //Takes 3rd position in array and makes lower case for easy switching
var value = process.argv.slice(3).join(" ");                        //Takes 4th position in Array and joins it all together after that

runSwitch(command,value);

function runSwitch(command,value){
    switch (command) {                                                  //Switch for taking in CLI command   
        case "do-this":
            readFile();
            break;

        case "spotify-this-song": {
            if (value === "") {
                value = "Base The Sign"                                   //Default song is Ace of Base - The Sign if no value set in CLI
                count = 1;
            }
            else {                                                       //Sets search count to 5 if song is entered
                count = 5;
            }
            spotifyThis(value, count);                                   //Calls the spotify function
            break;
        }
        case "concert-this": {
            concertThis(value);                                         //Calls the bands in town function
            break;
        }
        case "movie-this": {

            if (value === "") {
                value = "Mr+Nobody";                                      //default value if no value set in CLI
            }

            movieThis(value);                                           //Calls the IMDB function
            break;
        }
        case "do-what-it-says": {
            doThis();                                                   //Calls the Do This function
            break;
        }
        default: {
            console.log("Please enter a valid command.");               //Logs to console
        }
    };
};
                                                                    //Function when spotify-this-track is entered in CLI
function spotifyThis(value,count) {
    spotify.search({ type: 'track', query: value, limit: count }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
                                                                    // instantiate
        var table = new Table({
            head: ['Artist', 'Song Name', 'Link', 'Album']

        });
                                                                    //Loop through results and build a CLI table using CLI-Table3

        for (var i = 0; i < data.tracks.items.length; i++) {

            table.push(
                [data.tracks.items[i].album.artists[0].name, data.tracks.items[i].name, data.tracks.items[i].preview_url, data.tracks.items[i].album.name]
            );
        }
        console.log(table.toString());
    });
}
                                                                    //Function when concert-this is entered in CLI
function concertThis(value) {
                                                                    //Bands in town API request
    const url = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp";

                                                                    //Axios call to Bands in Town url
    axios.get(url).then(
        function (response) {
                                                                    //Shortens the response data line
            const jsonData = response.data;
                                                                    //Create a CLI table using cli-table3
            var table = new Table({
                head: ['Venue', 'Location', 'Date']
            });
                                                                    //Loops through response and outputs data to CLI table
            for (var i = 0; i < jsonData.length; i++) {

                table.push([jsonData[i].venue.name, jsonData[i].venue.city + " " + jsonData[i].venue.region, moment(jsonData[i].datetime).format('l')]);
            }

            console.log(table.toString());                           //Outputs the table to the console
        });
}
                                                                     //Function when movie-this is entered in CLI
function movieThis(value) {

    const url = "http://www.omdbapi.com/?apikey=trilogy&t=" + value; //Adds the omdbapi with Trilogy key to the url

    axios.get(url).then(                                             //Uses axios to pull data from api and return response
        function (response) {
            const jsonData = response.data;

            var table = new Table()
                                                                     //Create table with requested information about Movie title
            table.push(
                {"Title: " : jsonData.Title},
                {"Year: " : jsonData.Year},
                {"IMDB Rating: " : jsonData.imdbRating},
                {"Rotten Rating: " : jsonData.Ratings[1].Value},
                {"Produced: " : jsonData.Country},
                {"Language: " : jsonData.Language},
                {"Plot: " : jsonData.Plot},
                {"Actors: " : jsonData.Actors}
            );

            console.log(table.toString());                             //Outputs the table to CLI
        }
    )
}

function readFile() {

    fs.readFile("random.txt", "utf8", function(error, data) {
                                                                        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
                                                                        // Then split it by commas (to make it more readable)
        var dataArr = data.split(',');
        console.log(dataArr);

        runSwitch(dataArr[0],dataArr[1]);                               //Runs the switch statement with the data fs pulls from random.txt
      });
}
