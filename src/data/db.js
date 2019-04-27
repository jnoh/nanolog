// init sqlite db
const fs      = require('fs');
const sqlite = require('sqlite');

const dbFile  = './data/sqlite.db';

async function prepare() {
  console.log("Preparing database");
  const db = await sqlite.open(dbFile);

  await db.migrate({ force: 'last' });

  db.each('SELECT rowid, * from Notes', (err, row) => {
    console.log('record:', row);
  });
  
  return db;
}

module.exports = exports = prepare();
