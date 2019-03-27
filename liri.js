var axios = require("axios");

// require("dotenv").config();

// var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

var omdbAction = process.argv[2];
var input = process.argv[3];

function runAxiosOmdb() {
    // console.log('hi')
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy")
    .then(function(response) {
        console.log(response.data.Title, 
                    response.data.Year, 
                    response.data.imdbRating, 
                    response.data.Country, 
                    response.data.Language, 
                    response.data.Plot, 
                    response.data.Actors);
    })
}

if (omdbAction === 'movie-this') {
    // console.log(omdbAction);
    runAxiosOmdb();
}


