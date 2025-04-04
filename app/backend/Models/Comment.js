const { sql, poolPromise } = require('../db/db1');

async function createComment(data) {
  const pool = await poolPromise;
  await pool.request()
    .input('commentID', sql.UniqueIdentifier, data.commentID)
    .input('subID', sql.UniqueIdentifier, data.subID)
    .input('compID', sql.UniqueIdentifier, data.compID)
    .input('createdAt', sql.DateTime, data.createdAt)
    .input('content', sql.Text, data.content)
    .query(`INSERT INTO Comment (commentID, subID, compID, createdAt, content)
            VALUES (@commentID, @subID, @compID, @createdAt, @content)`);
}

async function getCommentsBySubmission(subID) {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('subID', sql.UniqueIdentifier, subID)
    .query('SELECT * FROM Comment WHERE subID = @subID');
  return result.recordset;
}

module.exports = { createComment, getCommentsBySubmission };
