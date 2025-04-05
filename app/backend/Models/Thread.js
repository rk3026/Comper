const { sql, poolPromise } = require('../db/database');

// Create a new thread and assign topics
async function createThread(name, topics = []) {
  const pool = await poolPromise;

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
  const pool = await poolPromise;

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
  const pool = await poolPromise;

  const threadResult = await pool.request()
    .input('threadID', sql.Int, threadID)
    .query(`SELECT id, name FROM threads WHERE id = @threadID`);

  const commentsResult = await pool.request()
    .input('threadID', sql.Int, threadID)
    .query(`
      SELECT id, content, creationTime 
      FROM threadComments 
      WHERE threadID = @threadID
      ORDER BY creationTime ASC
    `);

  return {
    ...threadResult.recordset[0],
    comments: commentsResult.recordset
  };
}

// Add a comment to a thread
async function addCommentToThread(threadID, content) {
  const pool = await poolPromise;
  await pool.request()
    .input('threadID', sql.Int, threadID)
    .input('content', sql.Text, content)
    .input('creationTime', sql.SmallDateTime, new Date())
    .query(`
      INSERT INTO threadComments (threadID, content, creationTime)
      VALUES (@threadID, @content, @creationTime)
    `);
}

module.exports = {
  createThread,
  listThreads,
  getThreadWithComments,
  addCommentToThread
};
