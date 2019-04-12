const db = require('./db');

db.serialize(() => {
  // insert default notes
  db.run('INSERT INTO Notes (createdAt, content) VALUES (datetime("now"), "Test note")');
});