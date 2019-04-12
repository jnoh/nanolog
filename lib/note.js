const db = require('../data/db');

function Note(record) {
  this.identifier = record.rowid;
  this.content    = record.content;
  this.createdAt  = new Date(record.createdAt);
}

Note.create = function(content) {
  db.serialize(() => {
    // insert default notes
    db.run('INSERT INTO Notes (createdAt, content) VALUES (datetime("now"), "' + content + '")');
  }); 
}

Note.get = function(identifier) {

}

module.exports = exports = Note;