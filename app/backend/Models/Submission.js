// models/Submission.js
const { sql, poolPromise } = require('../db/database');
const { queryFromPool } = require('./Utility');

async function createSubmission(data) {
  return queryFromPool(`
      INSERT INTO Submissions (compID, submissionTime, voteCount, totalCriteriaPoints, title, description, attachmentURL)
      VALUES (${data.compID}, ${data.submissionTime}, ${data.voteCount}, ${data.totalCriteriaPoints}, ${data.title}, ${data.description}, ${data.attachmentURL});
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
