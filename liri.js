require("dotenv").config();

var fs = require("fs");

var axios = require("axios");

var moment = require('moment');

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var input = process.argv.slice(3).join(' ')

// console.log(input) tested and verified this is showing up.

function helpMe() {
    console.log('-----------------------------');
    console.log('Instructions: ');
    console.log('-----------------------------');
}

function runSpotify() {
    spotify.search({type: 'track', query: input}, function(err, data) {
        if (err) {
            throw err;
        } else {
            // console.log(data.tracks.items[0])
            console.log('-------------------------------' + '\n' +
                        'Artist: ' + data.tracks.items[0].artists[0].name + '\n' +
                        'URL: ' + data.tracks.items[0].preview_url + '\n' +
                        'Album: ' + data.tracks.items[0].album.name + '\n' +
                        'Song: ' + data.tracks.items[0].name + '\n' +
                        '-------------------------------')
        }
    })
}

function runAxiosOmdb() {
    // console.log('hi')
    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            console.log('\n' + 'Title: ' + response.data.Title + '\n' +
                'Movie Year: ' + response.data.Year + '\n' +
                'IMDB Rating: ' + response.data.imdbRating + '\n' +
                'Country: ' + response.data.Country + '\n' +
                'Language: ' + response.data.Language + '\n' +
                'Plot: ' +response.data.Plot + '\n' +
                'Actors: ' + response.data.Actors + '\n');
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
} else if (action === 'spotify-this-song') {
    runSpotify();
} else if (action === 'do-what-it-says') {
    randomize();
}

function randomize() {
    fs.readFile('./random.txt', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        var test = data.split(',')
        console.log(test);
    });
}

function bandInTown() {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (var i = 0; i < 10; i++) {
                var dateTest = response.data[i].venue.datatime
                var converted = moment(dateTest).format('MMMM Do YYYY, h:mm:ss a')
            
                console.log('\n' + 'Venue Name: ' + response.data[i].venue.name + '\n' +
                    'Location: ' + response.data[i].venue.city + ', ' + response.data[i].venue.country + '\n' + 
                    'Date/Time: ' + converted + '\n');

                
                
            }

        })
}




