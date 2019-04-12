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

Note.get = async function(identifier) {
  return new Promise(function(resolve, reject) {
    db.get('SELECT * FROM Notes WHERE rowid = ?', identifier, (err, row) => {
      if (err) return reject(err);
      
      resolve(new Note(row));
    });
  });
}

module.exports = exports = Note;