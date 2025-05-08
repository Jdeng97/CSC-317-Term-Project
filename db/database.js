const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db_name = path.join(__dirname, 'pet_paradise.sqlite');

const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    console.error('Database opening error:', err);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create products table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      price REAL,
      image TEXT,
      category TEXT
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    );
  `);
});

module.exports = db;
