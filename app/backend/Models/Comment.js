/*
 * Handles SQL queries for comment related tables
 */

// models/Comment.js
const { sql, poolPromise } = require('../db/database');

// Creates an entry in the comments table given the data
async function createComment(data) {
  const pool = await poolPromise;
  await pool.request()
    .input('commentID', sql.UniqueIdentifier, data.commentID)
    .input('subID', sql.UniqueIdentifier, data.subID)
    .input('compID', sql.UniqueIdentifier, data.compID)
    .input('content', sql.Text, data.content)
    .input('createdAt', sql.DateTime, data.createdAt)
    .query(`
      INSERT INTO Comment (commentID, subID, compID, content, createdAt)
      VALUES (@commentID, @subID, @compID, @content, @createdAt)
    `);
}

// Retrieves all comments for a submission id from the SQL database
async function getCommentsBySubmission(subID) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('subID', sql.UniqueIdentifier, subID)
    .query(`
      SELECT * FROM Comment
      WHERE subID = @subID
      ORDER BY createdAt ASC
    `);
  return result.recordset;
}

// Updates an entry in the comments table in the SQL database
async function updateComment(commentID, data) {
  const pool = await poolPromise;
  await pool.request()
    .input('commentID', sql.UniqueIdentifier, commentID)
    .input('content', sql.Text, data.content)
    .query(`
      UPDATE Comment
      SET content = @content
      WHERE commentID = @commentID
    `);
}

// Deletes an entry from the comments table given a commentID
async function deleteComment(commentID) {
  const pool = await poolPromise;
  await pool.request()
    .input('commentID', sql.UniqueIdentifier, commentID)
    .query(`
      DELETE FROM Comment
      WHERE commentID = @commentID
    `);
}

module.exports = { 
  createComment, 
  getCommentsBySubmission, 
  updateComment, 
  deleteComment 
};
