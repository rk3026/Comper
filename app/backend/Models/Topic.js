/*
 * Handles SQL queries for setting and getting data from the topics table
 */

const { sql, getPool } = require('../db/database');

// Retrieves all topics in the database
async function getAllTopics() {
  const pool = getPool();
  const result = await pool.request().query(`
    SELECT DISTINCT name FROM (
      SELECT name FROM competitionTopics
      UNION
      SELECT name FROM threadTopics
    ) AS allTopics
    ORDER BY name ASC
  `);
  return result.recordset;
}

// Retrieves all competitions in the database that have a certain topic
async function getCompetitionsByTopic(name) {
  const pool = getPool();
  const result = await pool.request()
    .input('name', sql.NVarChar, name)
    .query(`
      SELECT c.*
      FROM competitions c
      JOIN competitionTopics ct ON c.id = ct.compID
      WHERE ct.name = @name
    `);
  return result.recordset;
}

// Retrieves all threads in the database that have a certain topic
async function getThreadsByTopic(name) {
  const pool = getPool();
  const result = await pool.request()
    .input('name', sql.NVarChar, name)
    .query(`
      SELECT t.*
      FROM threads t
      JOIN threadTopics tt ON t.id = tt.threadID
      WHERE tt.name = @name
    `);
  return result.recordset;
}

module.exports = {
  getAllTopics,
  getCompetitionsByTopic,
  getThreadsByTopic,
};
