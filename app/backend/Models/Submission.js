const { sql, getPool } = require('../db/database');
const { queryFromPool } = require('./Utility');

/**
 * Create a new submission record in the database.
 * @param {Object} data - Submission data
 */
async function createSubmission(data) {
  try {
    const pool = await getPool();
    await pool.request()
      .input('compID', sql.Int, data.compID)
      .input('submissionTime', sql.SmallDateTime, data.submissionTime)
      .input('voteCount', sql.Int, data.voteCount)
      .input('totalCriteriaPoints', sql.Int, data.totalCriteriaPoints)
      .input('title', sql.NVarChar(255), data.title)
      .input('description', sql.NVarChar(2000), data.description)
      .input('attachmentURL', sql.NVarChar(2000), data.attachmentURL)
      .query(`
        INSERT INTO [dbo].[submissions]
          (compID, submissionTime, voteCount, totalCriteriaPoints, title, description, attachmentURL)
        VALUES 
          (@compID, @submissionTime, @voteCount, @totalCriteriaPoints, @title, @description, @attachmentURL);
      `);
  } catch (err) {
    console.error('SQL error in createSubmission:', err);
    throw err;
  }
}

/**
 * Retrieve all submissions for a specific competition.
 * @param {number} compID - Competition ID
 */
async function listSubmissions(compID) {
  try {
    return await queryFromPool(`SELECT * FROM submissions WHERE compID = ${compID};`);
  } catch (err) {
    console.error('SQL error in listSubmissions:', err);
    throw err;
  }
}

/**
 * Get details of a specific submission.
 * @param {number} subID - Submission ID
 */
async function getSubmission(subID) {
  try {
    const submission = await queryFromPool(`SELECT * FROM submissions WHERE id = ${subID};`);
    return submission[0]; // Return the first submission in the result
  } catch (err) {
    console.error('SQL error in getSubmission:', err);
    throw err;
  }
}

/**
 * Retrieve comments for a specific submission.
 * @param {number} subID - Submission ID
 */
async function getCommentsBySubmissionId(subID) {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('subID', sql.Int, subID)
      .query(`SELECT * FROM submissionComments WHERE subID = @subID ORDER BY creationTime DESC`);
    return result.recordset;
  } catch (err) {
    console.error('SQL error in getCommentsBySubmissionId:', err);
    throw err;
  }
}

/**
 * Add a comment to a specific submission.
 * @param {number} subID - Submission ID
 * @param {string} content - Comment content
 */
async function addCommentToSubmission(subID, content) {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('subID', sql.Int, subID)
      .input('content', sql.Text, content)
      .query(`
        INSERT INTO submissionComments (subID, content, creationTime)
        OUTPUT INSERTED.id, INSERTED.content, INSERTED.creationTime
        VALUES (@subID, @content, GETDATE());
      `);

    // Return the inserted comment data
    return result.recordset[0];
  } catch (err) {
    console.error('SQL error in addCommentToSubmission:', err);
    throw err;
  }
}

module.exports = { 
  createSubmission, 
  listSubmissions, 
  getSubmission, 
  getCommentsBySubmissionId,
  addCommentToSubmission 
};
