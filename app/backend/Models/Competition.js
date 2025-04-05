// models/Competition.js
const { sql, getPool } = require('../db/database');

/**
 * Create a new competition record in the database.
 * @param {Object} data - Competition data
 */
async function createCompetition(data) {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('compID', sql.UniqueIdentifier, data.compID)
      .input('title', sql.NVarChar(255), data.title)
      .input('description', sql.Text, data.description)
	.input('startDesc', sql.Text, data.startDesc)
      .input('fileType', sql.NVarChar(50), data.fileType)
      .input('attachmentURL', sql.NVarChar(255), data.attachmentURL)
      .input('startTime', sql.DateTime, data.startTime)
      .input('deadline', sql.DateTime, data.deadline)
	.input('voteEndTime', sql.DateTime, data.voteEndTime)
      //.input('status', sql.NVarChar(10), data.status) // Example: "Sub" for Submission phase
      .query(`
        INSERT INTO Competition 
          (compID, title, description, submissionFileType, attachment, startTime, endTime, status)
        VALUES 
          (@compID, @title, @description, @submissionFileType, @attachment, @startTime, @endTime, @status)
      `);
  } catch (err) {
    console.error('SQL error in createCompetition:', err);
    throw err;
  }
}

/**
 * Retrieve all competitions from the database.
 */
async function getCompetitions() {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM Competitions');
    return result.recordset;
  } catch (err) {
    console.error('SQL error in getCompetitions:', err);
    throw err;
  }
}

module.exports = { createCompetition, getCompetitions };
