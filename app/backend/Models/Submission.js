// models/Submission.js
const { sql, poolPromise } = require('../db/database');

async function createSubmission(data) {
  const pool = await poolPromise;
  await pool.request()
    .input('subID', sql.UniqueIdentifier, data.subID)
    .input('compID', sql.UniqueIdentifier, data.compID)
    .input('file', sql.NVarChar(sql.MAX), data.file)
    .input('submittedAt', sql.DateTime, data.submittedAt)
    .input('rating', sql.Float, data.rating)
    .input('voteCount', sql.Int, data.voteCount)
    .query(`
      INSERT INTO Submission (subID, compID, file, submittedAt, rating, voteCount)
      VALUES (@subID, @compID, @file, @submittedAt, @rating, @voteCount)
    `);
}

async function listSubmissions(compID) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('compID', sql.UniqueIdentifier, compID)
    .query(`SELECT * FROM Submission WHERE compID = @compID`);
  return result.recordset;
}

async function getSubmission(subID) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('subID', sql.UniqueIdentifier, subID)
    .query(`SELECT * FROM Submission WHERE subID = @subID`);
  return result.recordset[0];
}

async function updateSubmission(subID, data) {
  const pool = await poolPromise;
  await pool.request()
    .input('subID', sql.UniqueIdentifier, subID)
    .input('file', sql.NVarChar(sql.MAX), data.file)
    .input('rating', sql.Float, data.rating)
    .input('voteCount', sql.Int, data.voteCount)
    .query(`
      UPDATE Submission
      SET file = @file, rating = @rating, voteCount = @voteCount
      WHERE subID = @subID
    `);
}

async function deleteSubmission(subID) {
  const pool = await poolPromise;
  await pool.request()
    .input('subID', sql.UniqueIdentifier, subID)
    .query(`DELETE FROM Submission WHERE subID = @subID`);
}

module.exports = { 
  createSubmission, 
  listSubmissions, 
  getSubmission, 
  updateSubmission, 
  deleteSubmission 
};
