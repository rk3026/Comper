// models/Utility.js
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

  module.exports = { queryFromPool };