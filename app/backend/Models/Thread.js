const sql = require('mssql');
const { getPool } = require('../db/database');

// Create a new thread and assign topics
async function createThread(name, topics = []) {
  const pool = getPool(); // Use getPool() to retrieve the pool

  // Insert the thread
  const threadResult = await pool.request()
    .input('name', sql.NVarChar(255), name)
    .query(`
      INSERT INTO threads (name)
      OUTPUT INSERTED.id
      VALUES (@name)
    `);

  const threadID = threadResult.recordset[0].id;

  // Insert thread topics
  for (const topic of topics) {
    await pool.request()
      .input('name', sql.NVarChar(255), topic)
      .input('threadID', sql.Int, threadID)
      .query(`
        INSERT INTO threadTopics (name, threadID)
        VALUES (@name, @threadID)
      `);
  }

  return threadID;
}

// List all threads (optionally filtered by topic)
async function listThreads(topic = null) {
  const pool = getPool();

  let result;
  if (topic) {
    result = await pool.request()
      .input('name', sql.NVarChar(255), topic)
      .query(`
        SELECT t.id, t.name 
        FROM threads t
        JOIN threadTopics tt ON t.id = tt.threadID
        WHERE tt.name = @name
        ORDER BY t.id DESC
      `);
  } else {
    result = await pool.request()
      .query(`
        SELECT id, name FROM threads
        ORDER BY id DESC
      `);
  }

  return result.recordset;
}

// Get a thread and its comments
async function getThreadWithComments(threadID) {
  const pool = getPool();

  const threadResult = await pool.request()
    .input('threadID', sql.Int, threadID)
    .query(`
      SELECT id, name 
      FROM threads 
      WHERE id = @threadID
    `);

  const commentsResult = await pool.request()
    .input('threadID', sql.Int, threadID)
    .query(`
      SELECT id, content, creationTime 
      FROM threadComments 
      WHERE threadID = @threadID
      ORDER BY creationTime ASC
    `);

  // Replace the id with a serial number starting from 1
  commentsResult.recordset.forEach((comment, index) => {
    comment.id = index + 1;
  });

  return {
    ...threadResult.recordset[0],
    comments: commentsResult.recordset
  };
}

// Add a comment to a thread
async function addCommentToThread(threadID, content, replyTo = null) {
  const pool = getPool();
  try {
    // Define the SQL query to insert the comment and return the inserted data
    const query = `
      INSERT INTO threadComments (threadID, content, creationTime)
      OUTPUT INSERTED.id, INSERTED.content, INSERTED.creationTime
      VALUES (@threadID, @content, @creationTime);
    `;

    // Execute the query
    const result = await pool.request()
      .input('threadID', sql.Int, threadID)
      .input('content', sql.Text, content)
      .input('creationTime', sql.SmallDateTime, new Date())
      .query(query);

    // Return the result, which contains the inserted comment data
    return result.recordset[0]; // Get the first row from the result

  } catch (err) {
    console.error('Error adding comment:', err.message);
  }
}


module.exports = {
  createThread,
  listThreads,
  getThreadWithComments,
  addCommentToThread
};
