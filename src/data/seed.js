const db = require('./db');

db.serialize(() => {
  // insert default notes
  db.run('');
});
