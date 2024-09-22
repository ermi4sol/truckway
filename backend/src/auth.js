// src/auth.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('./db');

async function registerUser(name, email, password, role) {
  const db = getDb();
  const hashedPassword = await bcrypt.hash(password, 10);

  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role],
      function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
}

async function loginUser(email, password) {
  const db = getDb();

  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        reject(err);
      } else if (!user) {
        reject(new Error('User not found'));
      } else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
          );
          resolve({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
        } else {
          reject(new Error('Invalid password'));
        }
      }
    });
  });
}

module.exports = { registerUser, loginUser };