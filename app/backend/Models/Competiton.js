const { sql, poolPromise } = require('../db/db1');

async function createCompetition(data) {
  const pool = await poolPromise;
  await pool.request()
    .input('compID', sql.UniqueIdentifier, data.compID)
    .input('title', sql.NVarChar(255), data.title)
    .input('description', sql.Text, data.description)
    .input('submissionFileType', sql.NVarChar(50), data.submissionFileType)
    .input('attachment', sql.NVarChar(255), data.attachment)
    .input('startTime', sql.DateTime, data.startTime)
    .input('endTime', sql.DateTime, data.endTime)
    .input('status', sql.NVarChar(10), data.status) // Enum: Sub, Vote, Fin
    .query(`INSERT INTO Competition (compID, title, description, submissionFileType, attachment, startTime, endTime, status)
            VALUES (@compID, @title, @description, @submissionFileType, @attachment, @startTime, @endTime, @status)`);
}

async function getCompetitions() {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM Competition');
  return result.recordset;
}

module.exports = { createCompetition, getCompetitions };