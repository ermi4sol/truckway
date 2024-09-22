// src/jobApplications.js
const { getDb } = require('./db');

async function createJobApplication(driverId, requestId) {
  const db = getDb();

  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO job_applications (driver_id, request_id, status) VALUES (?, ?, ?)',
      [driverId, requestId, 'pending'],
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

async function getJobApplications(filters = {}) {
  const db = getDb();
  let query = `
    SELECT ja.*, u.name as driver_name, tr.description, tr.pickup_location, tr.dropoff_location
    FROM job_applications ja
    JOIN users u ON ja.driver_id = u.id
    JOIN transport_requests tr ON ja.request_id = tr.id
  `;
  const queryParams = [];

  if (filters.driverId) {
    query += ' WHERE ja.driver_id = ?';
    queryParams.push(filters.driverId);
  } else if (filters.companyId) {
    query += ' WHERE tr.company_id = ?';
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

async function getJobApplicationById(id) {
  const db = getDb();

  return new Promise((resolve, reject) => {
    db.get(`
      SELECT ja.*, u.name as driver_name, tr.description, tr.pickup_location, tr.dropoff_location
      FROM job_applications ja
      JOIN users u ON ja.driver_id = u.id
      JOIN transport_requests tr ON ja.request_id = tr.id
      WHERE ja.id = ?
    `, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

async function updateJobApplicationStatus(id, companyId, newStatus) {
  const db = getDb();

  return new Promise((resolve, reject) => {
    db.run(`
      UPDATE job_applications
      SET status = ?
      WHERE id = ? AND request_id IN (SELECT id FROM transport_requests WHERE company_id = ?)
    `, [newStatus, id, companyId], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
}

module.exports = {
  createJobApplication,
  getJobApplications,
  getJobApplicationById,
  updateJobApplicationStatus
};