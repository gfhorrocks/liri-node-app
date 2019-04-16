# liri-node-app
liri-node-app

This application is similar to SIRI on Apple software, rather takes commands from CLI and outputs data.  Data is pulled from IMDB, Spotify, and Bands in Town.  

Node command is run with two arguments, command and a value.

If the value is "spotify-this-song", the next argument is the song title.

If the value is "movie-this", the next argument is the movie title.

If the value is "concert-this", the next argument is the band name.

Data is pulled in and outputted in a CLI Table format using NPM CLI-TABLE3 package.

If no argument is put in for value, Spotify and IMDB have default values set to:

    Spotify - Ace of Base The Sign
    IMDB - Mr. Nobody
    
Packages used
-Moment.js
-FS
-Node-Spotify 
-cli-table3
-Axios


Created By:
Greg Horrocks
