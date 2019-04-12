const db = require('../data/db');

function Note(record) {
  this.identifier = record.rowid;
  this.content    = record.content;
  this.createdAt  = new Date(record.createdAt);
  this.actor      = 'jnoh';
}

Note.prototype.toJSON = function() {
  return
}

Note.create = async function(content) {
  return new Promise(function(resolve, reject) {
    db.run('INSERT INTO Notes (createdAt, content) VALUES (datetime("now"), ?)', content, function(err) {
      if (err) return reject(err);

      resolve(await Note.get(this.lastID));
    });
  });
}

Note.find = async function(identifier) {
  return new Promise(function(resolve, reject) {
    db.get('SELECT * FROM Notes WHERE rowid = ?', identifier, (err, row) => {
      if (err) return reject(err);
      
      resolve(new Note(row));
    });
  });
}

module.exports = exports = Note;