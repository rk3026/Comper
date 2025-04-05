const { sql, getPool } = require('../db/database');
const { queryFromPool } = require('./Utility');

/**
 * Retrieve all competitions from the database.
 */
async function getCompetitions() {
  return await queryFromPool('SELECT * FROM competitions');
}

async function getCompetitionDetails(compID) {
  return await queryFromPool(`SELECT * FROM competitions WHERE id = ${compID};`);
}

async function getSubmissions(compID) {
  return await queryFromPool(`SELECT * FROM submissions WHERE compID = ${compID};`);
}

/**
 * Create a new competition record in the database.
 * @param {Object} data - Competition data
 */
async function createCompetition(data) {
  try {
    const pool = await getPool();
    await pool.request()
      .input('title', sql.NVarChar(255), data.title)
      .input('filetype', sql.NVarChar(255), data.filetype)
      .input('description', sql.NVarChar(2000), data.description)
      .input('startDesc', sql.NVarChar(2000), data.startDesc)
      .input('startTime', sql.SmallDateTime, data.startTime)
      .input('deadline', sql.SmallDateTime, data.deadline)
      .input('voteEndTime', sql.SmallDateTime, data.voteEndTime)
      .input('attachmentURL', sql.NVarChar(2000), data.attachmentURL)
      .query(`
        INSERT INTO [dbo].[competitions]
          (title, filetype, description, startDesc, startTime, deadline, voteEndTime, attachmentURL)
        VALUES 
          (@title, @filetype, @description, @startDesc, @startTime, @deadline, @voteEndTime, @attachmentURL);
      `);

      let maxCompID = (await queryFromPool(`SELECT MAX(id) FROM competitions;`))[0][''];

      for(let i = 0; i < data.criteria.length; ++i)
      {
        await pool.request()
        .input('compID', sql.Int, maxCompID)
        .input('name', sql.NVarChar(255), data.criteria[i].name)
        .input('description', sql.NVarChar(2000), data.criteria[i].description)
        .input('maxPoints', sql.Int, data.criteria[i].maxPoints)
        .query(`
          INSERT INTO [dbo].[criteria]
            (compID, name, description, maxPoints)
          VALUES 
            (@compID, @name, @description, @maxPoints);
        `);
      }

  } catch (err) {
    console.error('SQL error in createCompetition:', err);
    throw err;
  }
}

async function getCompetitionComments(compID) {
  try {
    // Fetch associated comments for the competition
    const comments = await queryFromPool(`SELECT * FROM competitionComments WHERE compID = ${compID} ORDER BY creationTime ASC`);

    // Return only the comments
    return comments || [];
  } catch (err) {
    console.error('SQL error in getCompetitionComments:', err);
    throw err;
  }
}

/**
 * Add a comment to a competition.
 */
async function addCommentToCompetition(compID, content, replyTo = null) {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('content', sql.NVarChar(2000), content)
      .input('replyTo', sql.Int, replyTo)  // Optional replyTo
      .input('compID', sql.Int, compID)
      .query(`
        INSERT INTO [dbo].[competitionComments] (content, compID, creationTime)
        OUTPUT INSERTED.id, INSERTED.content, INSERTED.creationTime
        VALUES (@content, @compID, GETDATE());
      `);

    // Return the inserted comment data, including ID and creation time
    const insertedComment = {
      id: result.recordset[0].id, // Now the inserted comment data will be available in result.recordset
      content: result.recordset[0].content,
      replyTo: result.recordset[0].replyTo,
      creationTime: result.recordset[0].creationTime,
    };

    return insertedComment;
  } catch (err) {
    console.error('SQL error in addCommentToCompetition:', err);
    throw err;
  }
}


module.exports = { 
  getCompetitions, 
  getCompetitionDetails, 
  getSubmissions, 
  createCompetition, 
  getCompetitionComments, 
  addCommentToCompetition 
};
