// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const db = require('./data/db');
const Note = require('./lib/note');

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/notes', function(request, response) {
  (async function() {
    const notes = await Note.all();
    response.send(notes.toString());
  })();
});

app.get('/note/:note', function(request, response) {
  (async function() {
    const note = await Note.find(request.params["note"]);
    response.send(note.apObject());
  })();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
