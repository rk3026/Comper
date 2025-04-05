// models/Competition.js
const { getPool } = require('../db/database');
const sql = require('mssql');

async function queryFromPool(queryString) {
  try {
    const pool = await getPool();
    const result = await pool.request().query(queryString);
    return result.recordset;
  } catch (err) {
    console.error('SQL error in queryFromPool:', err);
    throw err;
  }
}

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
    console.log("createCompetition in Competition.js");

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
  } catch (err) {
    console.error('SQL error in createCompetition:', err);
    throw err;
  }
}

module.exports = { getCompetitions, getCompetitionDetails, getSubmissions, createCompetition };
