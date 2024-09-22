// src/transportRequests.js
const { getDb } = require('./db');

async function createTransportRequest(companyId, description, pickupLocation, dropoffLocation, weight, price, timing) {
  const db = getDb();

  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO transport_requests (company_id, description, pickup_location, dropoff_location, weight, price, timing) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [companyId, description, pickupLocation, dropoffLocation, weight, price, timing],
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

async function getTransportRequests(filters = {}) {
  const db = getDb();
  let query = 'SELECT * FROM transport_requests';
  const queryParams = [];

  if (filters.companyId) {
    query += ' WHERE company_id = ?';
    queryParams.push(filters.companyId);
  }

  return new Promise((resolve, reject) => {
    db.all(query, queryParams, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function getTransportRequestById(id) {
  const db = getDb();

  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM transport_requests WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

async function updateTransportRequest(id, companyId, updates) {
  const db = getDb();
  const allowedUpdates = ['description', 'pickup_location', 'dropoff_location', 'weight', 'price', 'timing'];
  const updateFields = Object.keys(updates).filter(key => allowedUpdates.includes(key));

  if (updateFields.length === 0) {
    return Promise.reject(new Error('No valid update fields provided'));
  }

  const query = `UPDATE transport_requests SET ${updateFields.map(field => `${field} = ?`).join(', ')} WHERE id = ? AND company_id = ?`;
  const values = [...updateFields.map(field => updates[field]), id, companyId];

  return new Promise((resolve, reject) => {
    db.run(query, values, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
}

async function deleteTransportRequest(id, companyId) {
  const db = getDb();

  return new Promise((resolve, reject) => {
    db.run('DELETE FROM transport_requests WHERE id = ? AND company_id = ?', [id, companyId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
}

module.exports = {
  createTransportRequest,
  getTransportRequests,
  getTransportRequestById,
  updateTransportRequest,
  deleteTransportRequest
};