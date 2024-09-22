// src/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../truckway.db');

let db;

function initializeDatabase() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err);
        reject(err);
      } else {
        console.log('Connected to the SQLite database.');
        createTables()
          .then(() => resolve())
          .catch((err) => reject(err));
      }
    });
  });
}

function createTables() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users table
      db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL
      )`);

      // Transport requests table
      db.run(`CREATE TABLE IF NOT EXISTS transport_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        company_id INTEGER NOT NULL,
        description TEXT NOT NULL,
        pickup_location TEXT NOT NULL,
        dropoff_location TEXT NOT NULL,
        weight REAL NOT NULL,
        price REAL NOT NULL,
        timing TEXT NOT NULL,
        FOREIGN KEY (company_id) REFERENCES users (id)
      )`);

      // Job applications table
      db.run(`CREATE TABLE IF NOT EXISTS job_applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        driver_id INTEGER NOT NULL,
        request_id INTEGER NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (driver_id) REFERENCES users (id),
        FOREIGN KEY (request_id) REFERENCES transport_requests (id)
      )`);
    }, (err) => {
      if (err) {
        console.error('Error creating tables:', err);
        reject(err);
      } else {
        console.log('Tables created successfully');
        resolve();
      }
    });
  });
}

module.exports = {
  initializeDatabase,
  getDb: () => db
};