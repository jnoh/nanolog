// init sqlite db
const fs      = require('fs');
const sqlite3 = require('sqlite3').verbose();

const dbFile  = './sqlite.db';
const db      = new sqlite3.Database(dbFile);

const exists  = fs.existsSync(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  if (!exists) {
    db.run('CREATE TABLE Notes (createdAt TEXT NOT NULL, content TEXT NOT NULL)');
    console.log('New table Notes created!');
    
    // insert default notes
    db.run('INSERT INTO Notes (note) VALUES (datetime("now"), "Test note")');
  };
  
  console.log('Database "Notes" ready to go!');
  db.each('SELECT * from Notes', function(err, row) {
    if (row) console.log('record:', row);
  });
});

module.exports = exports = db;
