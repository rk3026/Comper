// models/Submission.js
const { sql, poolPromise } = require('../db/database');
const { queryFromPool } = require('./Utility');

async function createSubmission(data) {
  return queryFromPool(`
      INSERT INTO Submission (compID, submissionTime, voteCount, totalCriteriaPoints, title, description, attachmentURL)
      VALUES (${data.compID}, ${data.submissionTime}, ${data.voteCount}, ${data.totalCriteriaPoints}, ${data.title}, ${data.description}, ${data.attachmentURL});
    `);
}

async function listSubmissions(compID) {
  return queryFromPool(`SELECT * FROM Submission WHERE compID = ${compID}`);
}

async function getSubmission(subID) {
  return queryFromPool(`SELECT * FROM Submission WHERE id = ${subID}`)[0];
}



module.exports = { 
  createSubmission, 
  listSubmissions, 
  getSubmission, 
};
