var axios = require("axios");

var moment = require('moment');

// require("dotenv").config();

// var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var input = process.argv[3] || 'Mr. Nobody';

function helpMe() {
    console.log('-----------------------------');
    console.log('Instructions: ');
    console.log('-----------------------------');
}

function runAxiosOmdb() {
    // console.log('hi')
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            console.log(response.data.Title,
                response.data.Year,
                response.data.imdbRating,
                response.data.Country,
                response.data.Language,
                response.data.Plot,
                response.data.Actors);
        })
}

if (action === 'movie-this') {
    // console.log(action);
    runAxiosOmdb();
} else if (process.argv[2] === 'help') {
    helpMe();
} else if (input === 'Mr. Nobody') {
    runAxiosOmdb();
} else if (action === 'concert-this') {
    bandInTown();
}

function bandInTown() {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (var i = 0; i < 10; i++) {
                var dateTest = response.data[i].venue.datatime
                var converted = moment(dateTest).format('MMMM Do YYYY, h:mm:ss a')

                console.log(response.data[i].venue.name,
                    response.data[i].venue.city + ', ' + response.data[i].venue.country, converted);

                
                
            }

        })
}




