const db = require('../data/db');

function Note(record) {
  this.identifier = record.rowid;
  this.content    = record.content;
  this.createdAt  = new Date(record.createdAt);
}

Note.prototype.apObject = function() {
  return {
    "id": "https://tinyap.glitch.me/note/" + this.rowid,
    "type": "Note",
    "published": this.createdAt.toISOString(),
    "attributedTo": "https://tinyap.glitch.me/" + this.actor,
    "inReplyTo": "https://mastodon.social/@Gargron/100254678717223630",
    "content": this.content,
    "to": "https://www.w3.org/ns/activitystreams#Public"
  }
}

Note.create = async function(content) {
  return new Promise(function(resolve, reject) {
    db.run('INSERT INTO Notes (createdAt, content) VALUES (datetime("now"), ?)', content, function(err) {
      if (err) return reject(err);

      resolve(Note.find(this.lastID));
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

Note.all = async function() {
  return new Promise(function(resolve, reject) {
    db.all('SELECT rowid, * from Notes', function(err, rows) {
      if (err) reject(err);
      
      resolve(rows.map(row => new Note(row))); 
    });
  });
}

module.exports = exports = Note;