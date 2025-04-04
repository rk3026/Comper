const { sql, poolPromise } = require('../db/db1');

async function createSubmission(data) {
  const pool = await poolPromise;
  await pool.request()
    .input('subID', sql.UniqueIdentifier, data.subID)
    .input('compID', sql.UniqueIdentifier, data.compID)
    .input('file', sql.NVarChar(sql.MAX), data.file)
    .input('submittedAt', sql.DateTime, data.submittedAt)
    .input('rating', sql.Float, data.rating)
    .input('voteCount', sql.Int, data.voteCount)
    .input('name', sql.NVarChar(100), data.name)
    .input('comment', sql.Text, data.comment)
    .query(`INSERT INTO Submission (subID, compID, file, submittedAt, rating, voteCount, name, comment)
            VALUES (@subID, @compID, @file, @submittedAt, @rating, @voteCount, @name, @comment)`);
}

async function getSubmissionsByCompID(compID) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('compID', sql.UniqueIdentifier, compID)
    .query('SELECT * FROM Submission WHERE compID = @compID');
  return result.recordset;
}

module.exports = { createSubmission, getSubmissionsByCompID };
