// models/Submission.js
const { sql, getPool } = require('../db/database');
const { queryFromPool } = require('./Utility');

async function createSubmission(data) {
  /*
  return queryFromPool(`
      INSERT INTO Submissions (compID, submissionTime, voteCount, totalCriteriaPoints, title, description, attachmentURL)
      VALUES (${data.compID}, ${data.submissionTime}, ${data.voteCount}, ${data.totalCriteriaPoints}, ${data.title}, ${data.description}, ${data.attachmentURL}`)};
  */

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
}

async function listSubmissions(compID) {
  return queryFromPool(`SELECT * FROM Submissions WHERE compID = ${compID}`);
}

async function getSubmission(subID) {
  var submission = await queryFromPool(`SELECT * FROM Submissions WHERE id = ${subID}`);
  return submission[0];
}



module.exports = { 
  createSubmission, 
  listSubmissions, 
  getSubmission, 
};
