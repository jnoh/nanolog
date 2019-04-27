// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const db = require('./src/data/db');
const Note = require('./src/lib/note');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get('/notes', function(request, response) {
  (async function() {
    const notes = await Note.all();
    response.send(JSON.stringify(notes));
  })();
});

app.get('/note/:note', function(request, response) {
  (async function() {
    const note = await Note.find(request.params["note"]);
    response.send(note.apObject());
  })();
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/src/index.html');
});


const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
